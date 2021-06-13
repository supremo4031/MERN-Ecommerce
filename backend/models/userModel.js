import mongoose from "mongoose";
import { reqDefBool, reqString, unReqString } from "./types.js";


const userSchema = mongoose.Schema({
    name: reqString,
    email: unReqString,
    password: reqString,
    isAdmin: reqDefBool,
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)
export default User