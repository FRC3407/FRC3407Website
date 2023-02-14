import Layout from "@components/layout";
import connect from "db/connection";
import userSchema from "db/schemas/user.schema";
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next/types";
import styles from "styles/pages/Members.module.scss";
import {
  TeamDisplayNames,
  UserAccessLevelRolesDisplayNameEnum,
} from "util/enums";
import { aOrAn } from "util/formating";
import Avatar from "@mui/material/Avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import WebsiteIcon from "@mui/icons-material/Link";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function MemberPage({
  user,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (error) {
    return (
      <Layout title="Error">
        <div>{error}</div>
      </Layout>
    );
  }

  interface IDataAttribute<T = any, DefaultType = any> {
    label: string;
    id: string;
    default?: DefaultType;
    displayFn?: (val: T) => string | JSX.Element | JSX.Element[];
    ignoreIfUndefined?: boolean;
  }

  interface IContactAttribute {
    id: string;
    icon: any;
    formatFn?: (user: any) => string | null;
  }

  const contactAttributes: IContactAttribute[] = [
    {
      id: "email",
      icon: EmailIcon,
      formatFn(user) {
          if (user?.personalData?.contact?.email) return `mailto:${user?.personalData?.contact?.email}`
          return null
      },
    },
    {
      id: "personalSite",
      icon: WebsiteIcon,
    },
    {
      id: "github",
      icon: GitHubIcon,
    },
  ];

  const dataAttributes: IDataAttribute[] = [
    {
      label: "Some of my (many) Achievements",
      id: "achievements",
      displayFn(val: string[]) {
        return (
          <ul>
            {val.map((subval) => (
              <li key={subval}>{subval}</li>
            ))}
          </ul>
        );
      },
    },
    {
      label: "A couple of my interesting Interests",
      id: "interests",
      displayFn(val: string[]) {
        return (
          <ul>
            {val.map((subval) => (
              <li key={subval}>{subval}</li>
            ))}
          </ul>
        );
      },
    },
    {
      label: "Fun Facts",
      id: "facts",
      displayFn(val: string[]) {
        return (
          <ul>
            {val.map((subval) => (
              <li key={subval}>{subval}</li>
            ))}
          </ul>
        );
      },
    },
    {
      label: "Why I joined the Team",
      id: "whyJoined",
    },
    {
      label: "My Future Plans",
      id: "futurePlans",
    },
  ];

  const contactElements = contactAttributes
    .filter(
      (val) => typeof (user.personalData.contact || {})[val.id] === "string"
    )
    .map((contact, index) => (
      <div key={index}>
        <Link href={(contact.formatFn ?? (() => user.personalData.contact[contact.id]))(user)}>
          {contact.icon.type.render({ className: styles.contactButton })}
        </Link>
      </div>
    ));

  const userElements = dataAttributes
    .map((val) => {
      if (
        (user.personalData[val.id] == null ||
          user.personalData[val.id].length < 1) &&
        (val.ignoreIfUndefined ?? true)
      )
        return null;
      return (
        <div key={val.id} className={styles.dataPoint}>
          <h4>{val.label}</h4>
          {(val.displayFn || ((displayVal: any) => <p>{displayVal}</p>))(
            user.personalData[val.id]
          )}
        </div>
      );
    })
    .filter((val) => val != null);

  return (
    <Layout title={`${user.firstName} ${user.lastName}`}>
      <main className={styles.memberPage}>
        <div className={styles.titleDescription}>
          <Avatar
            src={user.personalData.primaryImage}
            className={styles.img}
            alt={`${user.firstName} ${user.lastName} Profile Image`}
            variant="square"
            sx={{
              height: "auto",
              width: "45vh",
              objectFit: "contain",
            }}
          />
          <div className={styles.title}>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <h4>
              {TeamDisplayNames[user.team as "admin"]} Team{" "}
              {UserAccessLevelRolesDisplayNameEnum[user.accessLevel]}
            </h4>
            <p>
              {user.personalData.description ??
                user.personalData.shortDescription ??
                `I'm ${user.firstName} and I'm on the ${
                  TeamDisplayNames[user.team as "admin"]
                } Team, I work as one of the ${
                  UserAccessLevelRolesDisplayNameEnum[user.accessLevel]
                }s. Because of my role as ${aOrAn(
                  TeamDisplayNames[user.team as "admin"]
                )} ${TeamDisplayNames[user.team as "admin"]} Team ${
                  UserAccessLevelRolesDisplayNameEnum[user.accessLevel]
                }, I haven't had too much free time to make a description of myself, so right now my description has been written by a very passive aggressive website developer who is not very happy with ${
                  user.firstName
                }!`}
            </p>
          </div>
        </div>
        <div className={styles.personalData}>
          {userElements.length > 0 ? (
            <div>
              <h3>A little more about me!</h3>
              <hr />
            </div>
          ) : null}
          <div className={styles.dataPoints}>{userElements}</div>
        </div>
        <div className={styles.contact}>
          {contactElements.length > 0 ? (
            <div>
              <hr />
              <h4>Contact Me!</h4>
            </div>
          ) : null}
          <div className={styles.contactButtons}>{contactElements}</div>
        </div>
        <hr />
        <div className={styles.memberPageNav}>
          <Button variant="outlined" href="./" className={styles.backButton}>
            All Team Members
          </Button>
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{
  user?: any;
  error?: string;
}> = async (context) => {
  try {
    if ((await connect()) === "NO URI PROVIDED")
      return { props: { error: "No DB Connection" } };
    const user = JSON.parse(
      JSON.stringify(
        await (userSchema as any)
          .findOneByDisplayUrl(context.params?.slug)
          .lean()
      )
    );

    if (!user)
      return {
        notFound: true,
      };

    delete user.email;

    return {
      props: {
        user,
      },
      revalidate: 86400,
    };
  } catch (error: any) {
    return {
      props: {
        error: error.message ?? "Unknown Error",
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    if ((await connect()) === "NO URI PROVIDED") {
      return {
        paths: [],
        fallback: false,
      };
    }

    const users = await userSchema
      .find({ accessLevel: { $gt: 1 } })
      .nor([{ displayUrl: undefined }]);
    return {
      paths: users.map((user) => {
        return { params: { slug: user.displayUrl } };
      }),
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};
