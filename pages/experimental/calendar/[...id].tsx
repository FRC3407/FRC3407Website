import Calendar from "@components/calendar";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { makeNiceUnit } from "util/calendar";

export default function DynamicCalendar() {
  const [date, setDate] = useState<string | null>(null);
  const router = useRouter()

  const {
    id,
    cd: countdown = "f",
    unit = "day",
    tz
  } = router.query

  useEffect(() => {
    const newDate = (id == undefined ? null : new Date(((id as string[]) ?? []).join("/")))
    if (newDate !== null && !isNaN(Number(newDate))) setDate(newDate.toISOString())
    else if (newDate !== null) setDate("Invalid Date")
  }, [id]);

  function useDate() {
    if (typeof date === "string" && !isNaN(Number(new Date(date ?? "a")))) {
      const newDate = new Date(date ?? "")
      return (
        <Calendar day={newDate} countdown={countdown === "t"} unit={makeNiceUnit(unit as string)} />
      )
    }

    if (typeof date === "string" && isNaN(Number(new Date(date ?? "a")))) {
      return (
        <p>Invalid Date</p>
      )
    }

    return (
      <p>Loading</p>
    );
  }

  function getTitle() {
    if (typeof date === "string" && !isNaN(Number(new Date(date ?? "a")))) return ` - ${new Date(date).toLocaleString("en-US", Intl.DateTimeFormat().resolvedOptions().timeZone as any)}`
    if (typeof date === "string") return " - Invalid Date"
    return ""
  }

  return (
    <Layout title={`Calendar${getTitle()}`}>
      {useDate()}
    </Layout>
  )
}

