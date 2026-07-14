import mongoose from "mongoose";
const {Schema} = mongoose;

const AuthSchema = new Schema({
    email:String,
    password:String
})

export const AuthModel = mongoose.model('Users',AuthSchema);