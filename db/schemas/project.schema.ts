import mongoose, { Schema } from "mongoose"

interface IProject {
    name: string
    description: string
    trelloURL: string
    team: string
}

const reqString = {
    type: String,
    required: true
}

const ProjectSchema = new Schema<IProject>({
    name: reqString,
    description: reqString,
    trelloURL: reqString,
    team: reqString,
})

export default mongoose.model<IProject>("project", ProjectSchema)