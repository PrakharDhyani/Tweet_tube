import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
        index : true // for optimising the searching
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
    },
    fullName : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        index : true    
    },
    avatar : {
        type : string, // cloudinary link 
        required : true
    },
    coverImage : {
        type : String , // cloudinary link
    },
    watchHistory : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    password : {
        type : String,
        required : [true,"Password is required"],
    },
    refreshTokens : {
        type : String
    }
},{
    timestamps : true
});


// pre and post are the middlewares that will be executed based on the event data and the function 
userSchema.pre("save",async function (next) {
    if(this.isModified("password")) {
        this.password = bcrypt(this.password,10);
    }
    next();
})

//checking if password is correct or not
userSchema.methods.isPasswordCorrect = async function(password) {
   return  await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema); 