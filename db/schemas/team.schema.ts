import mongoose from "mongoose"

interface ITeam {
    projects: string[] // Mongo IDs
    teamMembers: string[] // Mongo IDs
    coleads: string[] // Mongo IDs
    mentors: string[] // Mongo IDs
    name: string
}

const reqStringArray = {
    type: [String],
    required: true
}

const TeamSchema = new mongoose.Schema<ITeam>({
    projects: reqStringArray,
    teamMembers: reqStringArray,
    coleads: reqStringArray,
    mentors: reqStringArray,
    name: {
        required: true,
        type: String
    }
})

export default mongoose.model<ITeam>("team", TeamSchema)