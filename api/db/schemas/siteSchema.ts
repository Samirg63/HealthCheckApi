import mongoose from "mongoose";
const {Schema} = mongoose;

const siteSchema = new Schema({
    name:String,
    url:String
})

export const SiteModel = mongoose.model('Sites',siteSchema);