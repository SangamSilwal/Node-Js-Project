import mongoose from "mongoose";
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullName: {
            type:String,
            trim: true,
            required: true,
            index: true
        },
        avatar: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,   // we will use cloudnary for dataBase
        },
        watchHistory: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            required : [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }


    },
    {
        timestamps: true
    }
)
userSchema.pre("save",async function (next){
    if(!this.iModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})


//check if the password is correct or not 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}    //----> Here this.password is the password stored in the database and the function returns either true or false



userSchema.method.generateAccessToken = function()
{
    return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.method.generateRefreshToken = function()
{
    return jwt.sign(
        {
        _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)