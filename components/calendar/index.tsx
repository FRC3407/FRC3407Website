import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect, useState } from "react";

export default function Calender({ unit = "month", day = new Date(), countdown = false }: { unit?: "month" | "day" | "week", day?: Date, countdown?: boolean }) {
  const calRef = React.createRef<FullCalendar>();
  const [current, setCurrent] = useState<Date>(new Date())

  useEffect(() => {
    if (countdown) setTimeout(() => { setCurrent(new Date())}, 500)
  });

  if (countdown) {
    const alwaysInclude = ["seconds", "minutes", "hours"]
    const msToDate = day.getTime() > current.getTime() ? day.getTime() - current.getTime() : current.getTime() - day.getTime()

    const times = Object.entries({
      seconds: Math.abs(Math.floor((msToDate / 1000) % 60)),
      minutes: Math.abs(Math.floor((msToDate / 1000 / 60) % 60)),
      hours: Math.abs(Math.floor((msToDate / 1000 / 60 / 60) % 24)),
      days: Math.abs(Math.floor((msToDate / 1000 / 60 / 60 / 24) % 365)),
      years: Math.abs(Math.floor(msToDate / 1000 / 60 / 60 / 24 / 365))
    }).filter((val) => val[1] !== 0 || alwaysInclude.includes(val[0])).reverse()

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
      initialView={CalViewEnum[unit]}
      nowIndicator
      initialEvents={[{ title: "nice event", start: new Date("1/17/23 6:30") }]}
      navLinks
      weekNumbers
      initialDate={day?.toISOString()}
      headerToolbar={{
        start: 'title', 
        center: '',
        end: 'today prev,next dayGridMonth,dayGridWeek,dayGridDay'
      }}
      dateClick={(dateClick) => {
        dateClick.view.calendar.gotoDate(dateClick.date)
        dateClick.view.calendar.changeView("dayGridDay")
      }}
      eventClick={(eventClick) => {
        console.log(eventClick.event._def)
      }}
    />
  );
}

enum CalViewEnum {
  "month" = "dayGridMonth",
  "week" = "dayGridWeek",
  "day" = "dayGridDay"
}