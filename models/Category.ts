import { timeStamp } from "console";
import mongoose from "mongoose";

interface ICategory{
    name: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
    name: {type:String, required: true,}
},{timestamps: true})

export default mongoose.model("Category", categorySchema)