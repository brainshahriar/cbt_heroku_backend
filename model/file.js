import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
        file: { type: String, required: true, trim: true },
        // image:{
        //     type:String,
        // }
})

const fileModel = mongoose.model("file",fileSchema)

export default fileModel