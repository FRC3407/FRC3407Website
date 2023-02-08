import Layout from "@components/layout";
import connect from "db/connection";
import userSchema, { IUser, IUserSchema } from "db/schemas/user.schema";
import { LeanDocument, Types, Document } from "mongoose";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import styles from "styles/pages/Members.module.scss";

export default function Members({
  members,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (members === "NO CONNECTION") {
    return (
      <Layout title="Our Members">
        <h1>No DB connection</h1>
      </Layout>
    );
  }
  return (
    <Layout title="Our Members">
      <div>
        {members.map((member) => (
          <div key={member._id.toString()}>{member._id.toString()}</div>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  members:
    | "NO CONNECTION"
    | LeanDocument<
        Document<unknown, any, IUserSchema> &
          IUserSchema & { _id: Types.ObjectId }
      >[];
}> = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=432000"
  );
  if ((await connect()) === "NO URI PROVIDED")
    return {
      props: {
        members: "NO CONNECTION",
      },
    };

  return {
    props: {
      members: JSON.parse(
        JSON.stringify(await userSchema.find().lean().exec())
      ),
    },
  };
};
