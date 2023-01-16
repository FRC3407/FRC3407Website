import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect } from "react";

export default function Calender({ unit = "month", day = new Date(), countdown = false }: { unit?: "month" | "year" | "day" | "week", day?: Date, countdown?: boolean }) {
  const calRef = React.createRef<FullCalendar>();

  useEffect(() => {
    const api = calRef.current?.getApi();

    if (countdown) setTimeout(() => {}, 1000)
  });

  if (countdown) {
    const current = new Date()
    const msToDate = day.getTime() - current.getTime()

    const times = Object.entries({
      seconds: Math.abs(Math.floor((msToDate / 1000) % 60)),
      minutes: Math.abs(Math.floor((msToDate / 1000 / 60) % 60)),
      hours: Math.abs(Math.floor((msToDate / 1000 / 60 / 60) % 24)),
      days: Math.abs(Math.floor((msToDate / 1000 / 60 / 60 / 24) % 365)),
      years: Math.abs(Math.floor(msToDate / 1000 / 60 / 60 / 24 / 365))
    }).filter((val) => val[1] !== 0).reverse()
    
    const timeOb = Object.fromEntries(times)

    return (
      <div>
        {times.map(([unit, time], index) => <p key={index}>{unit}: {time}</p>)}
      </div>
    )
  }

  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin]}
      ref={calRef}
      initialView="dayGridMonth"
      nowIndicator
      initialEvents={[{ title: "nice event", start: new Date() }]}
      navLinks
      weekNumbers
      initialDate={day?.toISOString()}
      headerToolbar={{
        start: 'title', 
        center: '',
        end: 'today prev,next dayGridMonth,dayGridWeek,dayGridDay'
      }}
    />
  );
}
