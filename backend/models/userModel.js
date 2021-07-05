import mongoose from "mongoose";
import { reqDefBool, reqString, unReqString } from "./types.js";
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    name: reqString,
    email: unReqString,
    password: reqString,
    isAdmin: reqDefBool,
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword)  {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User