import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Units } from "types/calendar";
import { makeNiceUnit } from "util/calendar";

export default function Calendar({
  unit = "month",
  day = new Date(),
  countdown = false,
  overrideUrlParams = false,
}: {
  unit?: Units;
  day?: Date;
  countdown?: boolean;
  overrideUrlParams?: boolean;
}) {
  const calRef = React.createRef<FullCalendar>();
  const [current, setCurrent] = useState<Date>(new Date());
  const [dateCountdown, setCountdown] = useState<boolean>(countdown);
  const router = useRouter();

  useEffect(() => {
    if (dateCountdown)
      setTimeout(() => {
        setCurrent(new Date());
      }, 300);
    if (!overrideUrlParams) {
      if (router.query.countdown === "t" || router.query.cd === "t")
        setCountdown(true);
      if (
        typeof router.query.unit !== "undefined" &&
        calRef.current?.getApi !== undefined
      )
        calRef.current
          .getApi()
          .changeView(
            CalViewEnum[makeNiceUnit(router.query.unit.toString(), unit)]
          );
      if (
        (typeof router.query.date === "string" ||
          typeof router.query.day === "string") &&
        Math.max(new Date().getTime(), current.getTime()) -
          Math.min(new Date().getTime(), current.getTime()) <
          1000
      ) {
        const newDate = new Date(
          (router.query.date as string) ?? (router.query.day as string)
        );
        if (!isNaN(Number(newDate))) {
          setCurrent(newDate);
          if (
            !(router.query.countdown === "t" || router.query.cd === "t") &&
            typeof calRef.current?.getApi !== "undefined"
          )
            calRef.current.getApi().gotoDate(newDate);
        }
      }
    }
  }, [
    router,
    countdown,
    overrideUrlParams,
    calRef,
    unit,
    current,
    dateCountdown,
  ]);

  if (dateCountdown) {
    if (typeof (router.query.date ?? router.query.day) === "undefined") {
      return <div>No Date Provided for the countdown</div>;
    }

    const alwaysInclude = ["seconds", "minutes", "hours"];
    const msToDate =
      Math.max(new Date().getTime(), current.getTime()) -
      Math.min(new Date().getTime(), current.getTime());

    const times = Object.entries({
      seconds: Math.abs(Math.floor((msToDate / 1000) % 60)),
      minutes: Math.abs(Math.floor((msToDate / 1000 / 60) % 60)),
      hours: Math.abs(Math.floor((msToDate / 1000 / 60 / 60) % 24)),
      days: Math.abs(Math.floor((msToDate / 1000 / 60 / 60 / 24) % 365)),
      years: Math.abs(Math.floor(msToDate / 1000 / 60 / 60 / 24 / 365)),
    })
      .filter((val) => val[1] !== 0 || alwaysInclude.includes(val[0]))
      .reverse();

    return (
      <div>
        {times.map(([unit, time], index) => (
          <p key={index}>
            {unit}: {time}
          </p>
        ))}
      </div>
    );
  }

  return (
    <FullCalendar
      plugins={[interactionPlugin, dayGridPlugin, googleCalendarPlugin]}
      ref={calRef}
      initialView={CalViewEnum[unit]}
      nowIndicator
      googleCalendarApiKey={
        process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY ?? "NO_KEY_ERROR"
      }
      eventSources={[
        {
          googleCalendarId: "moundsviewrobotics@gmail.com",
        },
        {
          googleCalendarId:
            "3nejphqnbp82o3j8vpgtuo1g9c@group.calendar.google.com",
        },
      ]}
      navLinks
      weekNumbers
      initialDate={day?.toISOString()}
      headerToolbar={{
        start: "title",
        center: "",
        end: "today prev,next dayGridMonth,dayGridWeek,dayGridDay",
      }}
      dateClick={(dateClick) => {
        dateClick.view.calendar.gotoDate(dateClick.date);
        dateClick.view.calendar.changeView("dayGridDay");
      }}
      eventClick={(eventClick) => {
        const from = new URL(`http://localhost:3000/calendar`);
        from.searchParams.append(
          "unit",
          CalViewEnum[eventClick.view.calendar.view.type as "month"]
        );
        from.searchParams.append(
          "day",
          eventClick.event.start?.toISOString() ?? ""
        );
        router.push(
          `/calendar/events/${eventClick.event.id}?from=${encodeURIComponent(
            `${from.pathname}${from.search}`
          )}`
        );
      }}
      eventDataTransform={(event) => {
        event.url = "";
        return event;
      }}
    />
  );
}

enum CalViewEnum {
  "month" = "dayGridMonth",
  "week" = "dayGridWeek",
  "day" = "dayGridDay",
  "dayGridMonth" = "month",
  "dayGridWeek" = "week",
  "dayGridDay" = "day",
}
