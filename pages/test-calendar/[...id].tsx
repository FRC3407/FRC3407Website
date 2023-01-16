import Calendar from "@components/calendar";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DynamicCalendar() {
  const [date, setDate] = useState<string | null>(null);
  const router = useRouter()

  const {
    id,
    cd: countdown = "f"
  } = router.query

  console.log(countdown)

  useEffect(() => {
    const newDate = (id == undefined ? null : new Date(((id as string[]) ?? []).join("/")))
    if (newDate !== null && !isNaN(Number(newDate))) setDate(newDate.toISOString())
    else if (newDate !== null) setDate("Invalid Date")
  }, [router, date, setDate, id]);

  function useDate() {
    if (typeof date === "string" && !isNaN(Number(new Date(date ?? "a")))) {
      const newDate = new Date(date ?? "")
      return (
        <Calendar day={newDate} countdown={countdown === "t"} />
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
    if (typeof date === "string" && !isNaN(Number(new Date(date ?? "a")))) return ` - ${new Date(date).toUTCString()}`
    if (typeof date === "string") return " - Invalid Date"
    return ""
  }

  return (
    <Layout title={`Calendar${getTitle()}`}>
      {useDate()}
    </Layout>
  )
}
