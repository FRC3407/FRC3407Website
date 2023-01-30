import Layout from "@components/layout";
import connect from "db/connection";
import Users, { IUser } from "db/schemas/user.schema";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";
import { adminAuth } from "..";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";

interface IColumn {
  id: keyof IUser;
  label: string;
  format?: (user: IUser) => string;
  sortable?: boolean;
  sort?: (a: IUser, b: IUser) => number;
}

const columns: IColumn[] = [
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "accessLevel",
    label: "Access Level",
    format(user) {
      return UserAccessLevelRolesDisplayNameEnum[user.accessLevel];
    },
    sort: (a, b) => a.accessLevel - b.accessLevel,
  },
  {
    id: "_id",
    label: "Id",
  },
];

export default function UserManager({
  dbUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  let { page: queryPage = "1", rowsPerPage: queryRowsPerPage = "10", sortBy: querySortBy = "_id" } =
    router.query;

  /**
   * [Column ID, Ascending Order, sort function]
   */

  // filter out invalid query params
  if (isNaN(parseInt(queryPage as string))) queryPage = "1";
  if (isNaN(parseInt(queryRowsPerPage as string))) queryRowsPerPage = "10";
  if (Array.isArray(dbUsers) && dbUsers.length > 0 && typeof dbUsers[0][querySortBy as "lastName"] === "undefined") querySortBy = "_id"

  const [sortBy, setSortBy] = useState<
    [keyof IUser, boolean, (a: IUser, b: IUser) => number]
  >(["_id", false, defaultSort]);
  const [test, setTest] = useState("_id")

  const [rowsPerPage, setRowsPerPage] = useState(
    !isNaN(parseInt(queryRowsPerPage as string)) &&
      parseInt(queryRowsPerPage as string) < 1
      ? 10
      : parseInt(queryRowsPerPage as string)
  );
  const [page, setPage] = useState(
    !isNaN(parseInt(queryRowsPerPage as string)) &&
      parseInt(queryRowsPerPage as string) < 1
      ? 0
      : parseInt(queryPage as string) > Math.ceil(dbUsers.length / rowsPerPage)
      ? Math.ceil(dbUsers.length / rowsPerPage) - 1
      : parseInt(queryPage as string) - 1
  );

  const [sortColumn, setSortColumn] = useState<keyof IUser>("_id")

  if (
    (isNaN(page) ? 0 : page) + 1 !== parseInt(router.query.page as string) ||
    rowsPerPage !== parseInt(router.query.rowsPerPage as string)
  ) {
    router.push({
      pathname: "/admin/users",
      query: {
        page: page + 1,
        rowsPerPage,
      },
    });
  }

  function defaultSort(a: IUser, b: IUser): number {
    if (typeof a[sortBy[0]] !== typeof b[sortBy[0]]) {
      throw new SyntaxError(
        `Can't compare type ${typeof a} with type ${typeof b}`
      );
    }

    if (typeof a[sortBy[0]] === "string") {
      console.log(sortBy, test)
      console.log(a[sortBy[0]], b[sortBy[0]], a[sortBy[0]].localeCompare(b[sortBy[0]]))
      return a[sortBy[0]].localeCompare(b[sortBy[0]]);
    }
    return a[sortBy[0]] - b[sortBy[0]];
  }

  function setSort(
    column: IColumn,
    ascendingOrder: boolean,
    sortFn: (a: IUser, b: IUser) => number = defaultSort
  ) {
    console.log(column, "this")
    setSortBy([column.id, ascendingOrder, sortFn]);
  }

  if (typeof dbUsers === "string") {
    return (
      <Layout title="User Manager - Error">
        <p>No valid MongoDB URI provided</p>
      </Layout>
    );
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout title="User Manager">
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    onClick={(event) => {
                      console.log(event.target, column.id)
                      setSort(column, true, column.sort);
                      setTest(column.id)
                    }}
                  >
                    {sortBy[0] === column.id ? "| " : ""}
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dbUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(sortBy[2])
                .map((user) => {
                  return (
                    <TableRow hover role="checkbox" key={user._id.toString()}>
                      {columns.map((column) => (
                        <TableCell key={`${column.id}-${user._id.toString()}`}>
                          {typeof column.format !== "undefined"
                            ? column.format(user)
                            : user[column.id as "firstName"]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <button>edit</button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[
            parseInt(router.query.rowsPerPage as string),
            10,
            25,
            100,
          ].filter(
            (val, index, array) => !isNaN(val) && array.indexOf(val) === index
          )}
          component="div"
          count={dbUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dbUsers: IUser[] | string;
}> = async (context) => {
  if ((await connect()) === "NO URI PROVIDED") {
    return {
      props: {
        dbUsers: "ERROR",
      },
    };
  }

  return {
    props: {
      dbUsers: JSON.parse(JSON.stringify(await Users.find().lean())),
    },
  };
};

UserManager.auth = adminAuth;
