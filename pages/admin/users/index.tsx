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
  editable?: boolean;
  editState?: (user: IUser) => React.ReactElement;
  serialize?: (value: string) => any;
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
    editState: (user) => (
      <select
        defaultValue={user.accessLevel}
        id={`accessLevel-${user._id.toString()}`}
      >
        {Object.entries(UserAccessLevelRolesDisplayNameEnum)
          .filter((val) => isNaN(Number(val[0])))
          .map((role) => (
            <option key={role[0]} value={role[1]}>
              {role[0]}
            </option>
          ))}
      </select>
    ),
    serialize(value) {
      return parseInt(value);
    },
  },
  {
    id: "_id",
    label: "Id",
    editable: false,
  },
  {
    id: "accessExpires",
    label: "Access Expires",
    format(user) {
      if (user.accessExpires) {
        return new Date(user.accessExpires).toLocaleDateString();
      }
      return "Never";
    },
    editState: (user) => (
      <input
        type={"date"}
        defaultValue={
          user.accessExpires !== undefined
            ? new Date(user.accessExpires).toLocaleDateString("en-CA")
            : undefined
        }
      />
    ),
    serialize(value) {
      const date = new Date(value);

      if (isNaN(Number(date))) return undefined;
      return date;
    },
  },
];

export default function UserManager({
  dbUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  let {
    page: queryPage = "1",
    rowsPerPage: queryRowsPerPage = "10",
    sortBy: querySortBy = "_id",
  } = router.query;

  // filter out invalid query params
  if (isNaN(parseInt(queryPage as string))) queryPage = "1";
  if (isNaN(parseInt(queryRowsPerPage as string))) queryRowsPerPage = "10";
  if (
    Array.isArray(dbUsers) &&
    dbUsers.length > 0 &&
    typeof dbUsers[0][querySortBy as "lastName"] === "undefined"
  )
    querySortBy = "_id";

  // Statefully variable declarations
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

  const [sortColumn, setSortColumn] = useState<keyof IUser>("_id");
  const [ascending, setAscending] = useState(true);
  const [search, setSearch] = useState("");
  const [editRow, setEditRow] = useState<string | false>(false);
  const [userDelete, setDelete] = useState(false);

  if (typeof dbUsers === "string") {
    return (
      <Layout title="User Manager - Error">
        <p>No valid MongoDB URI provided</p>
      </Layout>
    );
  }

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
    if (typeof a[sortColumn] !== typeof b[sortColumn]) {
      throw new SyntaxError(
        `Can't compare type ${typeof a} with type ${typeof b}`
      );
    }

    if (typeof a[sortColumn] === "string") {
      return a[sortColumn].localeCompare(b[sortColumn]);
    }
    return a[sortColumn] - b[sortColumn];
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

  const columnsWithFormats = columns.filter(
    (column) => column.format !== undefined
  );

  let displayUsers = dbUsers;

  if (search.length > 0)
    displayUsers = displayUsers.filter((user) => {
      const tempUser = { ...user };
      columnsWithFormats.forEach((column) => {
        // @ts-expect-error
        tempUser[column.id] = column.format(user);
      });

      return !Object.values(tempUser).every(
        (value) => !(value ?? "").toString().toLowerCase().startsWith(search)
      );
    });

  displayUsers.sort(defaultSort);
  if (!ascending) displayUsers = displayUsers.reverse();

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
                    onClick={() => {
                      if (column.id === sortColumn) setAscending(!ascending);
                      else {
                        setSortColumn(column.id);
                        setAscending(true);
                      }
                    }}
                  >
                    {sortColumn === column.id ? "| " : ""}
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>
                  <input
                    type={"search"}
                    placeholder="Search"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      key={user._id.toString()}
                      id={user._id.toString()}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={`${column.id}-${user._id.toString()}`}
                          contentEditable={
                            (column.editable ?? true) &&
                            editRow === user._id.toString() &&
                            column.editState === undefined
                          }
                        >
                          <div id={`${column.id}-${user._id.toString()}`}>
                            {editRow === user._id.toString() &&
                            column.editState !== undefined
                              ? column.editState(user)
                              : typeof column.format !== "undefined"
                              ? column.format(user)
                              : user[column.id as "firstName"]}
                          </div>
                        </TableCell>
                      ))}
                      <TableCell className={"rowEditButtons"}>
                        <button
                          disabled={
                            (editRow !== false &&
                              editRow !== user._id.toString()) ||
                            userDelete
                          }
                          onClick={async () => {
                            if (editRow === user._id.toString()) {
                              const temp: { [key: string]: any } = {};

                              for (let column of columns) {
                                const element = document.getElementById(
                                  `${column.id}-${user._id.toString()}`
                                )?.firstChild;
                                const serialize =
                                  column.serialize ?? ((object: any) => object);
                                const serializedValue = serialize(
                                  (element as any).value ?? element?.nodeValue
                                );
                                if (
                                  serializedValue != null &&
                                  (serializedValue.length > 0 ||
                                    typeof serializedValue !== "string")
                                )
                                  temp[column.id as string] = serializedValue;
                              }

                              const res = await fetch(
                                "/api/admin/users/update",
                                {
                                  body: JSON.stringify({
                                    user: temp,
                                  }),
                                  method: "POST",
                                  headers: {
                                    "content-type": "application/json",
                                    "x-content-type-options": "nosniff",
                                  },
                                }
                              );

                              const resUser = (await res.json()).user;
                              dbUsers[
                                dbUsers.findIndex(
                                  (val) =>
                                    val._id.toString() ===
                                    resUser._id.toString()
                                )
                              ] = resUser;
                              setEditRow(false);
                            } else setEditRow(user._id.toString());
                          }}
                        >
                          {editRow !== user._id.toString() ? "Edit" : "Save"}
                        </button>
                        { /* This needs a loading screen */ }
                        <button 
                          disabled={editRow !== false || userDelete}
                          onClick={async () => {
                            setDelete(true);
                            const res = await fetch("/api/admin/users/delete", {
                              method: "DELETE",
                              body: JSON.stringify({
                                id: user._id.toString(),
                              }),
                              headers: {
                                "content-type": "application/json",
                                "x-content-type-options": "nosniff",
                              },
                            });

                            dbUsers.splice(
                              dbUsers.findIndex(
                                (val) =>
                                  val._id.toString() === user._id.toString()
                              ),
                              1
                            );
                            setDelete(false);
                          }}
                        >
                          Delete 
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <button onClick={() => router.push("./users/add")}>Add a User</button> { /* This needs a loading screen */}
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
      <button onClick={() => router.push("./")}>Back</button> { /* This needs a loading screen */}
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
