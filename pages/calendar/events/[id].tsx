import Back from "@components/buttons/Back";
import Layout from "@components/layout";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

export default function CalendarEvent({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  let back: () => void;
  if (router.query.back || router.query.from) {
    back = () =>
      router.push(
        (router.query.back as string) ?? (router.query.from as string)
      );
  } else {
    back = router.back;
  }

  if (event.error && event.error.code === 404) {
    return (
      <Layout title={"Event Not Fount"}>
        <h1>Event Not Found</h1>
      </Layout>
    );
  }

  if (event.error) {
    return (
      <Layout title={`Event Error - ${event.error.code}`}>
        <h1>Error: {event.error.message}</h1>
      </Layout>
    );
  }

  return (
    <Layout title={`Events - ${router.query.id}`}>
      Summary: {event.summary}
      <br />
      Organizer: {event.organizer.displayName ?? event.organizer.email}
      <br />
      Start:{" "}
      {new Date(event.start.dateTime ?? event.start.date).toLocaleString()}
      <br />
      End: {new Date(event.end.dateTime ?? event.end.date).toLocaleString()}
      <br />
      <Back url={back} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  let url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/moundsviewrobotics@gmail.com/events/${context.params?.id}`
  );
  url.searchParams.append(
    "key",
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY ?? ""
  );
  let res = await fetch(url);

  if (res.status === 404) {
    url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/3nejphqnbp82o3j8vpgtuo1g9c@group.calendar.google.com/events/${context.params?.id}`
    );
    url.searchParams.append(
      "key",
      process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY ?? ""
    );
    res = await fetch(url);
  }

  return {
    props: {
      event: await res.json(),
    },
    revalidate: 60 * 60 * 24 * 2,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
