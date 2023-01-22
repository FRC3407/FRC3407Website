import Calender from "@components/calendar";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { makeNiceUnit } from "util/calendar";

export default function UserCalender() {
  return (
    <Layout title="Calendar">
      <Calender unit={"month"} />
    </Layout>
  );
}