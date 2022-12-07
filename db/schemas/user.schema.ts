import mongoose from "mongoose"

interface IUser {
    name: string
    email: string // Email
    teams: string[] // Team Mongo ID
    isJohnLofton: boolean // Are they John Lofton Safety Manager?
}

const reqString = {
    required: true,
    type: String
}

const UserSchema = new mongoose.Schema<IUser>({
    name: reqString,
    email: reqString,
    teams: {
        type: [String],
        required: true
    },
    isJohnLofton: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model<IUser>("user", UserSchema)