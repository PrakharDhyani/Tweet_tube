import mongoose , {Schema, Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const VideoSchema = new Schema({
    videoFile : {
        type : String , // Cloudinary Link
        required : true,
        unique : true,
        trim : true,
    },
    thumbnail : {
        type : String, // Clourdinary Link
        trim : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    title : {
        type : String ,
        required : true,
    },
    description : {
        type : String ,
        required : true
    },
    duration : {
        type : Number, 
        required : true // it can be taken from cloudinary or aws wherever u r storing
    },
    views : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        required : true
    }
},{timestamps : true})


VideoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.Model("Video",VideoSchema)