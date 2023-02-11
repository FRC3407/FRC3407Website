import Layout from "@components/layout";
import connect from "db/connection";
import userSchema, { IUser, IUserSchema } from "db/schemas/user.schema";
import { LeanDocument, Types, Document } from "mongoose";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import styles from "styles/pages/Members.module.scss";
import Avatar from "@mui/material/Avatar"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Box from "@mui/material/Box"
import CloseIcon from "@mui/icons-material/Close"
import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import WebsiteIcon from "@mui/icons-material/AddLink";
import { TeamDisplayNames, UserAccessLevelRolesDisplayNameEnum } from "util/enums";
import { useState } from "react";
import { aOrAn } from "util/formating";
import Link from "next/link";

export default function Members({
  members,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [open, setOpen] = useState<string | false>(false)

  if (members === "NO CONNECTION") {
    return (
      <Layout title="Our Members">
        <h1>No DB connection</h1>
      </Layout>
    );
  }

  function ModalContent() {
    if (!open) return null
    
    const currentModelUser = (members as { [key: string]: any }[]).find((member) => member._id.toString() === open)

    if (!currentModelUser) return null

    return (
      <div className={styles.memberModal}>
        <CloseIcon className={styles.close} onClick={() => setOpen(false)} />
        <div className={styles.name}>
          <Avatar src={currentModelUser?.personalData?.primaryImage} sx={{
            height: "50px",
            width: "50px",
            margin: "5px"
          }} />
          <div className={styles.fullName}>
            <h3>{currentModelUser.firstName} {currentModelUser.lastName}</h3>
            <h4>{TeamDisplayNames[currentModelUser.team as "admin"]} Team {UserAccessLevelRolesDisplayNameEnum[currentModelUser.accessLevel]}</h4>
          </div>
        </div>
        <div className={styles.description}>
          <h3>A little bit about me:</h3>
          {currentModelUser.personalData?.shortDescription ?? `I'm ${currentModelUser.firstName} and I'm on the ${TeamDisplayNames[currentModelUser.team as "admin"]} Team, I work as one of the ${UserAccessLevelRolesDisplayNameEnum[currentModelUser.accessLevel]}s. Because of my role as ${aOrAn(TeamDisplayNames[currentModelUser.team as "admin"])} ${TeamDisplayNames[currentModelUser.team as "admin"]} Team ${UserAccessLevelRolesDisplayNameEnum[currentModelUser.accessLevel]}, I haven't had too much free time to make a description of myself, so right now my description has been written by a very passive aggressive website developer who is not very happy with ${currentModelUser.firstName}!`}
        </div>
        <div className={styles.personalPage}>
          {(typeof currentModelUser?.displayUrl === "string") ? <Link href={`./members/${currentModelUser?.displayUrl}`}>Check Out my Personal Page</Link> : null}
        </div>
        <div className={styles.socials}>
          {(typeof currentModelUser?.personalData?.contact?.email === "string") ? <Link href={`mailto:${currentModelUser?.personalData?.contact?.email}`} target="_blank" className={styles.icon}><Avatar sx={{
            color: "white",
            ":hover": {
              bgcolor: "grey"
            },
            transition: "0.5s"
          }}><EmailIcon /></Avatar></Link> : null}
          {(typeof currentModelUser?.personalData?.contact?.personalSite === "string") ? <Link href={`${currentModelUser?.personalData?.contact?.personalSite}`} target="_blank" className={styles.icon}><Avatar sx={{
            color: "white",
            ":hover": {
              bgcolor: "grey"
            },
            transition: "0.5s"
          }}><WebsiteIcon /></Avatar></Link> : null}
          {(typeof currentModelUser?.personalData?.contact?.email === "string") ? <Link href={`${currentModelUser?.personalData?.contact?.github}`} target="_blank" className={styles.icon}><Avatar sx={{
            color: "white",
            ":hover": {
              bgcolor: "grey"
            },
            transition: "0.5s"
          }}><GithubIcon /></Avatar></Link> : null}
        </div>
      </div>
    )
  }

  return (
    <Layout title="Our Members">
      <div className={styles.members}>
        <Modal open={!!open} onClose={() => setOpen(false)} closeAfterTransition>
          <Fade in={!!open}>
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: "80vw",
                height: "70vh",
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
              <ModalContent />
            </Box>
          </Fade>
        </Modal>
        {members.map((member) => (
          <div key={member._id.toString()} className={styles.member} onClick={() => setOpen(member._id.toString())}>
            <Avatar alt={member.firstName} src={member?.personalData?.primaryImage ?? ""} variant="square" sx={{
              height: "200px",
              width: "200px",
              borderRadius: "5px"
            }} />
            <p className={styles.name}>{member.firstName} {member.lastName}</p>
            <p className={styles.job}>{TeamDisplayNames[member.team as "admin"]} {UserAccessLevelRolesDisplayNameEnum[member.accessLevel]}</p>
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
        JSON.stringify(await userSchema.find({ accessLevel: { $gt: 1 }}).lean().exec())
      ),
    },
  };
};
