import mongoose from "mongoose";

interface IPost {
    title: string,
    desc: string,
    photo: string,
    name: string,
    categories: any[],
}

const postSchema = new mongoose.Schema<IPost>({
    title: {type: String, required: true, unique: true},
    desc:{type: String, required: true, unique: true},
    photo:{type:String, required:false},
    name:{type:String, require:true},
    categories: {type: [String], required: false}
}, {timestamps: true});


export default mongoose.model("Post", postSchema)