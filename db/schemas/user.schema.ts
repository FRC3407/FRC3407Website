import mongoose from "mongoose"

interface IUser {
    name: string
    email: string
    
}

const UserSchema = new mongoose.Schema<IUser>({

})