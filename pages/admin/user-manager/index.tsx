import Layout from "@components/layout";
import connect from "db/connection";
import Users, { IUser } from "db/schemas/user.schema";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { adminAuth } from "..";

export default function UserManager({
  dbUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(dbUsers);
  if (typeof dbUsers === "string") {
    return (
      <Layout title="User Manager - Error">
        <p>No valid MongoDB URI provided</p>
      </Layout>
    );
  }

  return (
    <Layout title="User Manager">
      <table>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Access Level</th>
        </tr>
        {dbUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.firstName + " " + user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.accessLevel}</td>
            <td>
              <button>edit</button>
            </td>
          </tr>
        ))}
        <button>+</button>
      </table>
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
      dbUsers: await Users.find(),
    },
  };
};

UserManager.auth = adminAuth;
