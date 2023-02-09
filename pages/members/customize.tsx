import Layout from "@components/layout";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email"
import GithubIcon from "@mui/icons-material/GitHub"
import WebsiteIcon from "@mui/icons-material/AddLink"
import { useState } from "react";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";
import React from "react";

export default function Customize() {
  const [avatarError, setAvatarError] = useState(false);
  const { data: session } = useSession();
  const { data, error } = useSWR(
    `/api/users/${session?.user.id}`,
    async (...args) => await (await fetch(...args)).json()
  );
  const [url, setUrl] = useState<string>();
  const [displayUrl, setDisplayUrl] = useState<string>()

  if (error) {
    return <Layout title="Error">{error.message}</Layout>;
  }

  if (!data) {
    return <Layout title="Customize Your Page">loading...</Layout>;
  }

  if (!url && data?.personalData?.primaryImage)
    setUrl(data?.personalData?.primaryImage);
  if (!displayUrl) setDisplayUrl(data?.personalData?.name ?? `${data?.firstName} ${data?.lastName}`)

  return (
    <Layout title="Customize Your Page">
      <h1>Customize your Profile</h1>
      <p>Fields left blank will not be included on your page, so don&apos;t feel obligated to fill all of them out</p>
      <form
        style={{
          display: "block",
        }}
        onSubmit={async (event) => {
          event.preventDefault()
          const form = event.target as HTMLFormElement

          const formElements: { [key: string]: any } = Object.fromEntries(Object.values(form).filter((val) => val.value !== undefined && val.value.length > 1 && val.type !== "submit").map(val => [val.id, val.value]))

          const userUpdate = {
            personalData: {

            },

          }
        }}
      >
        <TextField
          id="displayName"
          label="Display Name"
          defaultValue={data?.personalData?.name ?? `${data?.firstName} ${data?.lastName}`}
          placeholder="John Lofton"
          type={"text"}
          fullWidth
          margin="normal"
          onChange={(event) => {
            setDisplayUrl(event.target.value)
          }}
          helperText={`Your Display name and URL, your page will be displayed at /members/${encodeURIComponent((displayUrl ?? "").toLowerCase().replace(/[^a-z0-9]/g, ""))}`}
        />
        <FormControl fullWidth margin="normal">
          <TextField
            label="Avatar"
            id="avatarUrl"
            type="url"
            InputProps={{
              startAdornment: (
                <Avatar style={{ margin: "5px" }} src={url}></Avatar>
              ),
            }}
            onChange={(event) => {
              if (
                event.target.value.match(
                  /[A-Za-z]+:\/\/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_:%&;\?\#\/.=]+/g
                ) !== null ||
                event.target.value.startsWith("/static")
              ) {
                setAvatarError(false);
                setUrl(event.target.value);
              } else setAvatarError(true);
            }}
            placeholder="/static/images/assets/johnl.jpg"
            error={avatarError}
            onError={(error) => {
              error.preventDefault();
              setAvatarError(true);
            }}
            fullWidth
            defaultValue={data?.personalData?.primaryImage}
          />
          <FormHelperText id="avatar">
            Image must be hosted on this website or from a whitelisted domain
          </FormHelperText>
        </FormControl>
        <TextField fullWidth margin="normal" id="description" multiline label="Description" defaultValue={data?.personalData?.description} placeholder="I'm just too cool" helperText="Describe yourself, what don&apos;t people know about you/what do you want people to know about you" />
        <TextField fullWidth margin="normal" id="shortDescription" inputProps={{ maxLength: 70 }} label="Short Description" defaultValue={data?.personalData?.shortDescription} placeholder="I'm just too cool but in a short way" helperText="Describe yourself, but in under 70 characters" /> { /* Add length limit to this */}
        <TextField fullWidth margin="normal" id="career" label="Career/Job" defaultValue={data?.personalData?.career} placeholder={session?.user.accessLevel >= UserAccessLevelRolesDisplayNameEnum["Member"] ? "Software Engineer at Delta Kitchen Sinks since 1923" : "Planning to go into Software Engineering"} helperText="Your current/planned career" />
        <TextField fullWidth margin="normal" id="futurePlans" label="Future Plans" defaultValue={data?.personalData?.futurePlans} placeholder="Planning to go the the University of Minnesota and Major in Landscape Architecture" helperText="What are your plans for the future?" />
        <TextField fullWidth margin="normal" id="whyJoined" label="Why did you join the Robotics Team" defaultValue={data?.personalData?.futurePlans} placeholder="Because I would finally have an excuse to write code in math class" helperText="Why did you decide to join the robotics team?" />
        <TextField fullWidth margin="normal" id="achievements" label="Your Achievements" defaultValue={(data?.personalData?.achievements ?? []).join("\n")} multiline placeholder={"I made the robotics website\nI went outside once"} helperText="Some of your most impressive achievements (Please separate them with a new line)" />
        <TextField fullWidth margin="normal" id="interests" label="Your Interests" defaultValue={(data?.personalData?.interests ?? []).join("\n")} multiline placeholder={"Writing software\nIllegally making low bypass afterburning turbofan jet engines"} helperText="Some of your most interesting interests (Please separate them with a new line)" />
        <TextField fullWidth margin="normal" id="facts" label="Fun Facts" defaultValue={(data?.personalData?.facts ?? []).join("\n")} multiline placeholder={"I know over 10 different programming languages\nI only communicate in fax and telegraphs"} helperText="Some fun facts about you (Please separate them with a new line)" />
        <TextField fullWidth margin="normal" id="email" type="email" label="Contact Email" placeholder="myspam@spam.net" InputProps={{
          startAdornment: <EmailIcon style={{ marginRight: "10px" }}/>
        }} />
        <TextField fullWidth margin="normal" id="github" type="text" label="Github Profile" placeholder="https://github.com/FRC3407" InputProps={{
          startAdornment: <GithubIcon style={{ marginRight: "10px" }}/>
        }} />
        <TextField fullWidth margin="normal" id="github" type="text" label="Your Website" placeholder="https://frcteam3407.com" InputProps={{
          startAdornment: <WebsiteIcon style={{ marginRight: "10px" }}/>
        }} />
        <TextField type={"submit"} margin="normal" value={"Save"} />
      </form>
    </Layout>
  );
}

Customize.auth = {
  accessLevel: "tm"
};
