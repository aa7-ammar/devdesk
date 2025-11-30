import mongoose, { Schema , model , models } from "mongoose";

const RefreshTokenSchema = new Schema({
    token : {type : String , required : true , unique : true},
    userId : {type :String , required : true},
    expiresAt : {type : Date , required : true},
    userAgent : {type : String},
    createdAt : {type : Date , default : Date.now}
});

const RefreshToken = models.RefreshToken || model("RefreshToken" , RefreshTokenSchema);

export default RefreshToken;