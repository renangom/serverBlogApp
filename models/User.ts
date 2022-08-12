import mongoose from "mongoose";

interface IUser{
    name: string ;
    email: string;
    password: string;
    profilePicture: string
}

const userSchema = new mongoose.Schema<IUser>({
    name: {type: String,require: true,unique: true},
    email: {type: String,require: true,unique: true},
    password:{type:String,require: true,unique: true},
    profilePicture: {type:String,default: ""}
}, {timestamps: true})

export default mongoose.model("User", userSchema)