import mongoose from "mongoose";

const crudSchema = new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        file: { type: String, required: true, trim: true },
        // image:{
        //     type:String,
        // }
})

const crudModel = mongoose.model("crud",crudSchema)

export default crudModel