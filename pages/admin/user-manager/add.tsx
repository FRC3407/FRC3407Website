import Layout from "@components/layout";
import { FormEvent } from "react";
import { adminAuth } from "..";

export default function AddUser() {
  async function submitForm(event: FormEvent) {
    event.preventDefault();

    const res = await fetch("/api/admin/users/add");

    console.log(res, await res.text());
  }

  return (
    <Layout title="Add User">
      <form onSubmit={submitForm}>
        <input type={"submit"} />
      </form>
    </Layout>
  );
}

AddUser.auth = adminAuth;
