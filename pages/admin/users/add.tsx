import Layout from "@components/layout";
import { FormEvent } from "react";
import { adminAuth } from "..";
import formStyles from "styles/form.module.scss"
import { UserAccessLevelRolesDisplayNameEnum } from "util/enums";

export default function AddUser() {

    async function submitForm(event: FormEvent) {
        event.preventDefault()
        const form = event.target as HTMLFormElement

        const splitName = form.userName.value.split(" ") as string[]

        const userData = {
            firstName: splitName.shift(),
            lastName: splitName.join(" "),

        }

        console.log(userData)

        const res = await fetch("/api/admin/users/add")
        
        console.log(Object.entries(UserAccessLevelRolesDisplayNameEnum), await res.json())
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
                    <select id="accessLevel" name="accessLevel">
                        <option unselectable="on" selected>(Select Access Level)</option>
                        <option value={1}>Visitor</option>
                        <option value={2}>Member</option>
                        <option value={3}>Colead</option>
                        <option value={4}>Website Developer</option>
                        <option value={5}>System Administrator</option>
                    </select>
                </div>
                <input type={"submit"} />
            </form>
        </Layout>
    )
}

AddUser.auth = adminAuth