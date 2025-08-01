import mongoose, { Schema } from "mongoose"
const  UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    phoneNumber:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["student","recruiter"],
        require:true,
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:"Company"},
        profilePhoto:{type:String,default:""},
    }
},{timestamps:true});

const User = mongoose.model("User",UserSchema);
export default User;
