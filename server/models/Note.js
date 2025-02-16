import mongoose from "mongoose";

// define Note schema here 
const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
    // and the type will be taken as ObjectId, the way it is stored on MongoDB.
    // userId will be referenced by the User schema.
})

const Note = mongoose.model('Note', NoteSchema);
export default Note