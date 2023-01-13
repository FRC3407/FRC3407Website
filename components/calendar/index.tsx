import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const calRef = React.createRef<FullCalendar>();
  const router = useRouter();

  useEffect(() => {
    const api = calRef.current?.getApi();

    console.log(api?.getDate());
  });
  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin]}
      ref={calRef}
      initialView="dayGridMonth"
      nowIndicator={true}
      initialEvents={[{ title: "nice event", start: new Date() }]}
    />
  );
}
