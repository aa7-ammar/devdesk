import mongoose from 'mongoose';


const snippetSchema = new mongoose.Schema({
    userId : {type : String , required : true},
    language : {type : String , required : true},
    code : {type : String , required : true}
}, {timestamps : true});

export default mongoose.models.Snippet || mongoose.model("Snippet" , snippetSchema);