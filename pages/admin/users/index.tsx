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
  id: string;
  label: string;
  format?: (user: IUser) => string;
  sortable?: boolean
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

  const {
    queryPage = 1,
    
  } = router.query

  /**
   * [Column ID, Ascending Order]
   */
  const [sortBy, setSortBy] = useState<[keyof IUser, boolean]>(["_id", false])

  const [rowsPerPage, setRowsPerPage] = useState(parseInt(router.query.rowsPerPage as string ?? 10) ?? 10);
  const [page, setPage] = useState(
    ((parseInt(router.query.page as string ?? "0") > Math.ceil(dbUsers.length / rowsPerPage) || parseInt(router.query.page as string ?? "0") < 0) ? 1 : parseInt(router.query.page as string)) - 1
  );

  if ((isNaN(page) ? 0 : page) + 1 !== parseInt(router.query.page as string) || rowsPerPage !== parseInt(router.query.rowsPerPage as string)) {
    router.push({
      pathname: "/admin/users",
      query: {
        page: page + 1,
        rowsPerPage
      },
    });
  }
  console.log([parseInt(router.query.rowsPerPage as string), 10, 25, 100].filter((val) => !isNaN(val)));

  if (typeof dbUsers === "string") {
    return (
      <Layout title="User Manager - Error">
        <p>No valid MongoDB URI provided</p>
      </Layout>
    );
  }

  const EditAbleColumn = ({ user }: { user: IUser }) => {
    const [editable, setEditable] = useState(false);

    function userRole() {
      if (editable)
        return (
          <select id={`${user._id.toString()}AccessSelect`}>
            {Object.entries(UserAccessLevelRolesDisplayNameEnum)
              .filter(([key]) => isNaN(parseInt(key)))
              .map(([key, val], index) => (
                <option
                  key={index}
                  value={val}
                  selected={val === user.accessLevel}
                >
                  {key}
                </option>
              ))}
          </select>
        );

      return UserAccessLevelRolesDisplayNameEnum[user.accessLevel];
    }
    return (
      <tr contentEditable={editable} id={user._id.toString()}>
        <td>
          <input type="checkbox" />
        </td>
        <td>{user.firstName + " " + user.lastName}</td>
        <td>{user.email}</td>
        <td contentEditable={false}>{userRole()}</td>
        <td contentEditable={false}>{user._id.toString()}</td>
        <td contentEditable={false}>
          <button
            onClick={async () => {
              if (
                editable &&
                (
                  document.getElementById(
                    `${user._id.toString()}AccessSelect`
                  ) as any
                )?.value
              ) {
                user.accessLevel = (
                  document.getElementById(
                    `${user._id.toString()}AccessSelect`
                  ) as any
                )?.value;

                if (
                  user.email.match(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                  ) === null
                ) {
                }
                const res = await fetch("/api/admin/users/update", {
                  body: JSON.stringify({
                    user,
                  }),
                  method: "post",
                  headers: {
                    "content-type": "application/json",
                  },
                });
                console.log(await res.text(), "here");
              }
              setEditable(!editable);
            }}
          >
            {editable ? "save" : "edit"}
          </button>
          <button>🗑</button>
        </td>
      </tr>
    );
  };

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
      {/* <table>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>User</th>
          <th>Email</th>
          <th>Access Level</th>
          <th>User ID</th>
        </tr>
        {dbUsers.map((user, index) => (
          <EditAbleColumn user={user} key={index} />
        ))}
        <button>+</button>
      </table> */}
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dbUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort((a, b) => b[sortBy[0]].localeCompare(a[sortBy[0]]))
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
          rowsPerPageOptions={[parseInt(router.query.rowsPerPage as string), 10, 25, 100].filter((val, index, array) => !isNaN(val) && array.indexOf(val) === index)}
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
