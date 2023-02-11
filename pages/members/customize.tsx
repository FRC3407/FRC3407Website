import Layout from "@components/layout";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import WebsiteIcon from "@mui/icons-material/AddLink";
import { useState } from "react";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";
import React from "react";
import axios from "axios";

export default function Customize() {
  const [avatarError, setAvatarError] = useState(false);
  const [saving, setSaving] = useState(false);
  const { data: session } = useSession();
  const { data, error } = useSWR(
    `/api/users/${session?.user.id}`,
    async (...args) => await (await fetch(...args)).json()
  );
  const [url, setUrl] = useState<string>();
  const [displayUrl, setDisplayUrl] = useState<string>();

  if (error) {
    return <Layout title="Error">{error.message}</Layout>;
  }

  if (!data) {
    return <Layout title="Customize Your Page">loading...</Layout>;
  }

  if (!url && data?.personalData?.primaryImage)
    setUrl(data?.personalData?.primaryImage);
  if (!displayUrl)
    setDisplayUrl(
      data?.personalData?.name ?? `${data?.firstName} ${data?.lastName}`
    );

  return (
    <Layout title="Customize Your Page">
      <h1>Customize your Profile</h1>
      <p>
        Fields left blank will not be included on your page, so don&apos;t feel
        obligated to fill all of them out
      </p>
      <form
        style={{
          display: "block",
        }}
        onSubmit={async (event) => {
          event.preventDefault();
          setSaving(true);
          const form = event.target as HTMLFormElement;

          const formElements: { [key: string]: any } = Object.fromEntries(
            Object.values(form)
              .filter(
                (val) =>
                  val.value !== undefined &&
                  val.value.length > 1 &&
                  val.type !== "submit"
              )
              .map((val) => [val.id, val.value])
          );

          const userUpdate = {
            personalData: {
              primaryImage: formElements?.avatarUrl ?? session?.user?.image,
              name: displayUrl,
              description: formElements?.description,
              shortDescription: formElements.shortDescription,
              achievements: (formElements?.achievements ?? "")
                .split("\n")
                .filter((val: string) => val.length > 0),
              facts: (formElements?.facts ?? "")
                .split("\n")
                .filter((val: string) => val.length > 0),
              interests: (formElements?.interests ?? "")
                .split("\n")
                .filter((val: string) => val.length > 0),
              whyJoined: formElements.whyJoined,
              career: formElements.career,
              futurePlans: formElements.futurePlans,
              contact: {
                github: formElements.github,
                email: formElements.email,
                personalSite: formElements.personalSite,
              },
            },
            importUrl: undefined,
            displayUrl: encodeURIComponent(
              (displayUrl ?? "").toLowerCase().replace(/[^a-z0-9]/g, "")
            ),
          };

          const res = await axios.put(
            `/api/users/${data._id.toString()}/update`,
            {
              data: userUpdate,
            }
          );

          console.log(userUpdate, res);
          setSaving(false);
        }}
      >
        <TextField
          id="displayName"
          label="Display Name"
          defaultValue={
            data?.personalData?.name ?? `${data?.firstName} ${data?.lastName}`
          }
          placeholder="John Lofton"
          type={"text"}
          fullWidth
          margin="normal"
          onChange={(event) => {
            setDisplayUrl(event.target.value);
          }}
          InputProps={{ readOnly: saving }}
          disabled={saving}
          helperText={`Your Display name and URL, your page will be displayed at /members/${encodeURIComponent(
            (displayUrl ?? "").toLowerCase().replace(/[^a-z0-9]/g, "")
          )}`}
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
              readOnly: saving,
            }}
            disabled={saving}
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
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="description"
          InputProps={{ readOnly: saving }}
          multiline
          label="Description"
          defaultValue={data?.personalData?.description}
          placeholder="I'm just too cool"
          helperText="Describe yourself, what don't people know about you/what do you want people to know about you"
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="shortDescription"
          InputProps={{ readOnly: saving }}
          inputProps={{ maxLength: 350 }}
          label="Short Description"
          defaultValue={data?.personalData?.shortDescription}
          placeholder="I'm just too cool but in a short way"
          helperText="Describe yourself, but in 350 characters or less!"
        />{" "}
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="career"
          label="Career/Job"
          InputProps={{ readOnly: saving }}
          defaultValue={data?.personalData?.career}
          placeholder={
            session?.user.accessLevel >=
            UserAccessLevelRolesDisplayNameEnum["Member"]
              ? "Software Engineer at Delta Kitchen Sinks since 1923"
              : "Planning to go into Software Engineering"
          }
          helperText="Your current/planned career"
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="futurePlans"
          label="Future Plans"
          InputProps={{ readOnly: saving }}
          defaultValue={data?.personalData?.futurePlans}
          placeholder="Planning to go the the University of Minnesota and Major in Landscape Architecture"
          helperText="What are your plans for the future?"
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="whyJoined"
          label="Why did you join the Robotics Team"
          InputProps={{ readOnly: saving }}
          defaultValue={data?.personalData?.whyJoined}
          placeholder="Because I would finally have an excuse to write code in math class"
          helperText="Why did you decide to join the robotics team?"
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="achievements"
          label="Your Achievements"
          InputProps={{ readOnly: saving }}
          defaultValue={(data?.personalData?.achievements ?? []).join("\n")}
          multiline
          placeholder={"I made the robotics website\nI went outside once"}
          helperText="Some of your most impressive achievements (Please separate them with a new line)"
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="interests"
          label="Your Interests"
          InputProps={{ readOnly: saving }}
          defaultValue={(data?.personalData?.interests ?? []).join("\n")}
          multiline
          placeholder={
            "Writing software\nIllegally making low bypass afterburning turbofan jet engines"
          }
          helperText="Some of your most interesting interests (Please separate them with a new line)"
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="facts"
          label="Fun Facts"
          InputProps={{ readOnly: saving }}
          defaultValue={(data?.personalData?.facts ?? []).join("\n")}
          multiline
          placeholder={
            "I know over 10 different programming languages\nI only communicate in fax and telegraphs"
          }
          helperText="Some fun facts about you (Please separate them with a new line)"
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="email"
          type="email"
          label="Contact Email"
          placeholder="myspam@spam.net"
          InputProps={{
            startAdornment: <EmailIcon style={{ marginRight: "10px" }} />,
            readOnly: saving,
          }}
          defaultValue={data?.personalData?.contact?.email}
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="github"
          type="text"
          label="Github Profile"
          placeholder="https://github.com/FRC3407"
          InputProps={{
            startAdornment: <GithubIcon style={{ marginRight: "10px" }} />,
            readOnly: saving,
          }}
          inputProps={{
            pattern: "https://github.com/[a-z0-9]{1,}",
          }}
          defaultValue={data?.personalData?.contact?.github}
        />
        <TextField
          fullWidth
          disabled={saving}
          margin="normal"
          id="personalSite"
          type="text"
          label="Your Website"
          placeholder="https://frcteam3407.com"
          InputProps={{
            startAdornment: <WebsiteIcon style={{ marginRight: "10px" }} />,
            readOnly: saving,
          }}
          inputProps={{
            pattern:
              "(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?",
          }}
          defaultValue={data?.personalData?.contact?.personalSite}
        />
        <TextField
          type={"submit"}
          disabled={saving}
          margin="normal"
          value={"Save"}
          InputProps={{ readOnly: saving }}
        />
      </form>
    </Layout>
  );
}

Customize.auth = {
  accessLevel: "tm",
};
