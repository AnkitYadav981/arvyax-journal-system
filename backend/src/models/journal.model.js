import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    ambience : {
        type : String,
        required : true,
    },
    text : {
        type : String,
        required : true,
    },
    emotion : {
        type : String,
    },
    keywords : {
        type : [String],
    },
    summary : {
        type : String,
    },


},{
    timestamps : true
})

const journal = mongoose.model("Journal", userSchema);

export default journal;