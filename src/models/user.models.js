import mongoose from "mongoose";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName :{
        type :String,
        required:true,
        lowercase :true,
        index:true,
        trim:true,
    },
    email :{
        type :String,
        required:true,
        lowercase :true,
    },

    fullName:{
        type :String,
        required:true,
        uppercase :true,

    },
    avater:{
        type :String,
        required:true,

    },
    coverImage:{
        type :String,
        required:true,
    },
    
    watchHistory:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"video"
    }], 

    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
        required:true,

    }
},
{timestamps:true}
)

userSchema.pre("save", function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10);
    next()
}) 

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    jwt.sign({
        _id:this._id,
        userName: this.userName,
        email: this.email,
        fullName: this.fullName,

    },
        process.env.ACCESS_TOKEN,
    
    {
        expireIn : process.env.ACCESS_TOKEN_EXPIRY,
    }
    )
}


userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id:this.id,
    },
    process.env.REFRESH_TOKEN,
    {
        expireIn : process.env.REFRESH_TOKEN_EXPIRY,
    }
    )
}



export const user = mongoose.model("user",userSchema)