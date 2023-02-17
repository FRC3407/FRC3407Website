import Layout from "@components/layout";
import connect from "db/connection";
import userSchema, { IUserSchema } from "db/schemas/user.schema";
import { LeanDocument, Types, Document } from "mongoose";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import styles from "styles/pages/Members.module.scss";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import WebsiteIcon from "@mui/icons-material/AddLink";
import {
  TeamDisplayNames,
  UserAccessLevelRolesDisplayNameEnum,
} from "util/enums";
import { useState } from "react";
import { aOrAn } from "util/formating";
import Link from "next/link";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

export default function Members({
  members,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [open, setOpen] = useState<string | false>(false);
  const [sortBy, setSortBy] = useState("role");

  if (members === "NO CONNECTION") {
    return (
      <Layout title="Our Members">
        <h1>No DB connection</h1>
      </Layout>
    );
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
        if (user?.personalData?.contact?.email)
          return `mailto:${user?.personalData?.contact?.email}`;
        return null;
      },
    },
    {
      id: "personalSite",
      icon: WebsiteIcon,
    },
    {
      id: "github",
      icon: GithubIcon,
    },
  ];

  interface ISortBy {
    header: string;
    members: any[];
  }

  const sortByRole: ISortBy[] = [
    {
      header: "Coleads",
      members: members.filter(
        (member) =>
          member.accessLevel === UserAccessLevelRolesDisplayNameEnum["Colead"]
      ),
    },
    {
      header: "Team Members",
      members: members.filter(
        (member) =>
          member.accessLevel === UserAccessLevelRolesDisplayNameEnum["Member"]
      ),
    },
    {
      header: "Mentors and Administrators",
      members: members.filter(
        (member) =>
          member.accessLevel ===
            UserAccessLevelRolesDisplayNameEnum["Mentor"] ||
          member.accessLevel ===
            UserAccessLevelRolesDisplayNameEnum["Administrator"]
      ),
    },
  ];

  const sortByTeam: ISortBy[] = [
    "admin",
    "build",
    "controls",
    "programming",
  ].map((team) => {
    return {
      header: TeamDisplayNames[team as "admin"] + " Team",
      members: members
        .filter((member) => member.team === team)
        .sort((a, b) => b.accessLevel - a.accessLevel),
    };
  });

  function ModalContent() {
    if (!open) return null;

    const currentModelUser = (members as { [key: string]: any }[]).find(
      (member) => member._id.toString() === open
    );

    if (!currentModelUser) return null;

    const contactElements = contactAttributes
      .filter(
        (val) =>
          typeof (currentModelUser.personalData.contact || {})[val.id] ===
          "string"
      )
      .map((contact, index) => (
        <div key={index}>
          <Link
            href={(
              contact.formatFn ??
              (() => currentModelUser.personalData.contact[contact.id])
            )(currentModelUser)}
          >
            {contact.icon.type.render({ className: styles.contactButton })}
          </Link>
        </div>
      ));

    return (
      <div className={styles.memberModal}>
        <CloseIcon className={styles.close} onClick={() => setOpen(false)} />
        <div className={styles.name}>
          <Avatar
            src={currentModelUser?.personalData?.primaryImage}
            sx={{
              height: "50px",
              width: "50px",
              margin: "5px",
            }}
          />
          <div className={styles.fullName}>
            <h3>
              {currentModelUser.firstName} {currentModelUser.lastName}
            </h3>
            <h4>
              {TeamDisplayNames[currentModelUser.team as "admin"]} Team{" "}
              {
                UserAccessLevelRolesDisplayNameEnum[
                  currentModelUser.accessLevel
                ]
              }
            </h4>
          </div>
        </div>
        <div className={styles.description}>
          <h3>A little bit about me:</h3>
          {currentModelUser.personalData?.shortDescription ??
            `I'm ${currentModelUser.firstName} and I'm on the ${
              TeamDisplayNames[currentModelUser.team as "admin"]
            } Team, I work as one of the ${
              UserAccessLevelRolesDisplayNameEnum[currentModelUser.accessLevel]
            }s. Because of my role as ${aOrAn(
              TeamDisplayNames[currentModelUser.team as "admin"]
            )} ${TeamDisplayNames[currentModelUser.team as "admin"]} Team ${
              UserAccessLevelRolesDisplayNameEnum[currentModelUser.accessLevel]
            }, I haven't had too much free time to make a description of myself, so right now my description has been written by a very passive aggressive website developer who is not very happy with ${
              currentModelUser.firstName
            }!`}
        </div>
        <div className={styles.contact}>
          {typeof currentModelUser.displayUrl === "string" ? (
            <Button href={`./members/${currentModelUser?.displayUrl}`}>
              Check out my personal page
            </Button>
          ) : null}
          <div className={styles.contactButtons}>{contactElements}</div>
        </div>
      </div>
    );
  }

  return (
    <Layout title="Our Members">
      <div className={styles.pageHeader}>
        <h2>Our Members</h2>
        <FormControl>
          <Select
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
            }}
            variant={"outlined"}
            sx={{
              height: "70%",
            }}
          >
            <MenuItem value={"role"}>Sort By Member Role</MenuItem>
            <MenuItem value={"team"}>Sort By Member Team</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.membersContainer}>
        <Modal
          open={!!open}
          onClose={() => setOpen(false)}
          closeAfterTransition
        >
          <Fade in={!!open}>
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80vw",
                height: "70vh",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <ModalContent />
            </Box>
          </Fade>
        </Modal>
        {(sortBy === "role" ? sortByRole : sortByTeam)
          .filter((sort) => sort.members.length > 0)
          .map((section) => (
            <div
              key={section.header}
              id={section.header}
              className={styles.memberGroup}
            >
              <div className={styles.header}>
                <hr />
                <h3>{section.header}</h3>
                <hr style={{ width: "80%" }} />
              </div>
              <div className={styles.members}>
                {section.members.map((member) => (
                  <div
                    key={member._id.toString()}
                    className={styles.member}
                    onClick={() => setOpen(member._id.toString())}
                  >
                    <Avatar
                      alt={member.firstName}
                      src={member?.personalData?.primaryImage ?? ""}
                      variant="square"
                      sx={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "5px",
                      }}
                    />
                    <p className={styles.name}>
                      {member.firstName} {member.lastName}
                    </p>
                    <p className={styles.job}>
                      {TeamDisplayNames[member.team as "admin"]}{" "}
                      {UserAccessLevelRolesDisplayNameEnum[member.accessLevel]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  members:
    | "NO CONNECTION"
    | LeanDocument<
        Document<unknown, any, IUserSchema> &
          IUserSchema & { _id: Types.ObjectId }
      >[];
}> = async ({ res }) => {
  try {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=432000"
    );
    if ((await connect()) === "NO URI PROVIDED")
      return {
        props: {
          members: "NO CONNECTION",
        },
      };

    return {
      props: {
        members: JSON.parse(
          JSON.stringify(
            await userSchema
              .find({ accessLevel: { $gt: 1 } })
              .lean()
              .exec()
          )
        ),
      },
    };
  } catch (error: any) {
    return {
      props: {
        members: "NO CONNECTION",
      },
    };
  }
};
