import Layout from "@components/layout";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";

export default function Customize() {
  const [avatarError, setAvatarError] = useState(false);
  const { data: session } = useSession();
  const { data, error } = useSWR(
    `/api/users/${session?.user.id}`,
    async (...args) => await (await fetch(...args)).json()
  );
  const [url, setUrl] = useState<string>();

  if (error) {
    return <Layout title="Error">{error.message}</Layout>;
  }

  if (!data) {
    return <Layout title="Customize Your Page">loading...</Layout>;
  }

  if (!url && data?.personalData?.primaryImage)
    setUrl(data?.personalData?.primaryImage);

  return (
    <Layout title="Customize Your Page">
      <h1>Customize your Profile</h1>
      <p>Fields left blank will not be included on your page, so don&apos;t feel obligated to fill all of them out</p>
      <form
        style={{
          display: "block",
        }}
      >
        <TextField
          id="displayName"
          label="Display Name"
          defaultValue={data?.personalData?.name ?? ""}
          type={"text"}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <TextField
            label="Avatar"
            id="avatarURL"
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
            placeholder="Image URL"
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
        <TextField fullWidth margin="normal" id="shortDescription" inputProps={{ maxLength: 150 }} label="Short Description" defaultValue={data?.personalData?.shortDescription} placeholder="I'm just too cool but in a short way" helperText="Describe yourself, but in under 150 characters" /> { /* Add length limit to this */}
        <TextField fullWidth margin="normal" id="career" label="Career/Job" defaultValue={data?.personalData?.career} placeholder={session?.user.accessLevel >= UserAccessLevelRolesDisplayNameEnum["Member"] ? "Software Engineer at Boeing since 1923" : "Planning to go into Software Engineering"} helperText="Your current/planned career" />
        <TextField fullWidth margin="normal" id="futurePlans" label="Future Plans" defaultValue={data?.personalData?.futurePlans} placeholder="Planning to go the the University of Minnesota and Major in Art" helperText="What are your plans for the future?" />
        <TextField fullWidth margin="normal" id="yearJoined" inputProps={{ inputMode: 'numeric', pattern: '20[0-9][0-9]' }} label="Year Joined" />
        <TextField type={"submit"} />
      </form>
    </Layout>
  );
}

Customize.auth = {};
