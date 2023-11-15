import mongoose from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({

    video:{
        vidoFile:{
            type:String,
            required:true
        },

        thumbnailFile:{
            type:String,
            required:true
        },

        ower: 
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"video"
            },

        title:{
            type:String,
            required:true,
            uppercase:true,
        },

        descrpation:{
            type:String,
            required:true,
        },

        duration:{
            type:Number,
            required:true,

        },

        views:{
            type:Number,
            default:0
        },
        
        isPublished:{
            type:Boolean,
            default:true
        },

    }
},{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model('video',videoSchema);