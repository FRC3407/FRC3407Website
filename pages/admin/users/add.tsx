import Layout from "@components/layout";
import { FormEvent, useState } from "react";
import { adminAuth } from "..";
import { signIn, useSession } from "next-auth/react";
import { IUserSchema } from "db/schemas/user.schema";
import {
  TeamDisplayNames,
  UserAccessLevelRolesDisplayNameEnum,
} from "util/enums";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import styles from "styles/components/Form.module.scss";

export default function AddUser() {
  const { data: session } = useSession();
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [validDate, setValidDate] = useState(true);

  async function submitForm(event: FormEvent) {
    setAdding(true);
    if (
      !session?.user ||
      new Date(session.expires).getTime() <= new Date().getTime()
    )
      return signIn();

    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const splitName = form.userName.value.trim().split(" ") as string[];

    if (form.accessLevel.value === "select") {
      setAdding(false);
      return setMessage("Error! Please set the user's access level");
    }

    if (form.team.value === "select") {
      setAdding(false);
      return setMessage("Error! Please set the user's team");
    }

    const userData = {
      firstName: splitName.shift(),
      lastName: splitName.join(" "),
      email: form.email.value,
      accessLevel: parseInt(form.accessLevel.value),
      isJohnLofton: form.userName.value.trim().toLowerCase() === "john lofton",
      team: form.team.value,
      personalData: {
        name: form.userName.value,
      },
    } as IUserSchema;

    if (!isNaN(Number(new Date(form.accessExpires.value))))
      userData.accessExpires = new Date(form.accessExpires.value);

    const res = await fetch("/api/admin/users/add", {
      body: JSON.stringify({
        user: userData,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Content-Type-Options": "nosniff",
      },
      method: "post",
    });

    if (res.status !== 200) {
      setAdding(false);
      return setMessage(`Error! Server Resonded with a ${res.status} Error`);
    }

    const resContent = await res.json();

    (event.target as HTMLFormElement).reset();
    setAdding(false);
    setMessage(
      `Success! ${resContent.user.firstName} ${
        resContent.user.lastName
      } was added as a(n) ${
        UserAccessLevelRolesDisplayNameEnum[resContent.user.accessLevel]
      }.`
    );
  }

  const accessLevels = Object.entries(
    UserAccessLevelRolesDisplayNameEnum
  ).filter((val) => isNaN(parseInt(val[0])));
  const teams = Object.entries(TeamDisplayNames);

  function RenderAlert() {
    if (message) {
      return (
        <Alert
          severity={message.startsWith("Error!") ? "error" : "success"}
          variant="filled"
          className={styles.error}
        >
          {message}
        </Alert>
      );
    }
    return null;
  }

  return (
    <Layout title="Add User">
      <div className={styles.formContainer}>
        <RenderAlert />
        <form onSubmit={submitForm}>
          <TextField
            name="userName"
            id="userName"
            label="Name"
            helperText="The user's first and last name, this will be their initial username"
            placeholder="John Lofton"
            required
            fullWidth
          />
          <TextField
            name="email"
            id="email"
            label="Email"
            helperText="The user's email, this will be how the auth system identifies them"
            type={"email"}
            required
            fullWidth
          />
          <TextField
            id="accessLevel"
            name="accessLevel"
            label="Access Level"
            defaultValue={"select"}
            select
            required
            fullWidth
            helperText="What Access Level the user will have, this will effect what pages they wee and what they can do on those pages"
          >
            <MenuItem value="select" disabled hidden>
              (Select Access Level)
            </MenuItem>
            {accessLevels.map((accessLevel) => (
              <MenuItem key={accessLevel[0]} value={accessLevel[1]}>
                {accessLevel[0]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="team"
            name="team"
            label="Team"
            select
            required
            fullWidth
            helperText="What Team the user is assigned to"
            defaultValue={"select"}
          >
            <MenuItem value="select" disabled hidden>
              (Select a Team)
            </MenuItem>
            {teams.map((team) => (
              <MenuItem key={team[1]} value={team[0]}>
                {team[1]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="accessExpires"
            name="accessExpires"
            type={"date"}
            error={!validDate}
            onChange={(change) => {
              if (
                change.target.value.length < 10 ||
                new Date(change.target.value).getTime() > new Date().getTime()
              ) {
                if (!validDate) setValidDate(true);
              } else {
                setValidDate(false);
              }
            }}
            helperText={`The Date the user's access level will expire, they will be changed to a visitor after their access expires${
              !validDate
                ? ", the date must be at least 2 day in the future"
                : ""
            }`}
            fullWidth
          />
          <div>
            <TextField
              type={"submit"}
              disabled={!validDate || adding}
              sx={{
                width: "min-content",
                marginRight: "5px",
              }}
            />
            <TextField
              type={"button"}
              onClick={() => router.push("./")}
              value="Back"
              sx={{
                width: "min-content",
              }}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

AddUser.auth = adminAuth;
