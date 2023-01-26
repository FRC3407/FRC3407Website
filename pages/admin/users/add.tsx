import Layout from "@components/layout";
import { FormEvent } from "react";
import { adminAuth } from "..";
import formStyles from "styles/form.module.scss"
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";
import { useSession } from "next-auth/react";

export default function AddUser() {

    const { data: session } = useSession()
    console.log(session)

    async function submitForm(event: FormEvent) {
        if (!session?.user) {
            return document.getElementsByClassName(formStyles.errorBox)[0].textContent = "No User Signed in"
        }

        document.getElementsByClassName(formStyles.errorBox)[0].textContent = ""
        event.preventDefault()
        const form = event.target as HTMLFormElement

        const splitName = form.userName.value.trim().split(" ") as string[]

        if (parseInt(form.accessLevel.value) === -1) {
            return document.getElementsByClassName(formStyles.errorBox)[0].textContent = "Please set the user's access level"
        }

        const userData = {
            firstName: splitName.shift(),
            lastName: splitName.join(" "),
            email: form.email.value,
            accessExpires: new Date(form.accessExpires.value),
            accessLevel: parseInt(form.accessLevel.value),
            isJohnLofton: form.userName.value.trim().toLowerCase() === "john lofton",
            teams: []
        }

        console.log(userData)

        const res = await fetch("/api/admin/users/add", { 
            body: JSON.stringify({
                user: userData
            }),
            headers: {
                "Content-Type": "application/json",
                "X-Content-Type-Options": "nosniff"
            },
            method: "post"
        })
        
        const resContent = await res.json()

        if (res.status !== 200) {
            console.log(resContent)
            return document.getElementsByClassName(formStyles.errorBox)[0].textContent = resContent.message ?? `${res.status} Error`
        }
    }

    return (
        <Layout title="Add User">
            <div className={formStyles.errorBox}>

            </div>
            <form onSubmit={submitForm}>
                <div className={formStyles.formInput}>
                    <label htmlFor="userName">Name</label><br />
                    <input type={"text"} id="userName" name="userName" pattern="[a-zA-Z]{2,} [a-zA-Z '-]{2,}" title="The New User's First and Last Name" required autoComplete="off" /> 
                </div>
                <div className={formStyles.formInput}>
                    <label htmlFor="email">Email</label><br />
                    <input type={"email"} id="email" name="email" required autoComplete="off" /> 
                </div>
                <div className={formStyles.formInput}>
                    <label htmlFor="accessLevel">Access Level</label><br />
                    <select id="accessLevel" name="accessLevel" defaultValue={-1} required>
                        <option value={-1} disabled unselectable="on">(Select Access Level)</option>
                        <option value={1}>Visitor</option>
                        <option value={2}>Member</option>
                        <option value={3}>Colead</option>
                        <option value={4}>Website Developer</option>
                        <option value={5}>System Administrator</option>
                    </select>
                </div>
                <div className={formStyles.formInput}>
                    <label htmlFor="accessExpires">Access Expires</label><br />
                    <input type={"date"} id="accessExpires" name="accessExpires" required autoComplete="off" /> 
                </div>
                <input type={"submit"} />
            </form>
        </Layout>
    )
}

AddUser.auth = adminAuth