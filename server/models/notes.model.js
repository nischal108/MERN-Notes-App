const mongoose = require('mongoose');
const { boolean } = require('zod');

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[],
    },
    createdOnDate:{
        type:Date,
        default:Date.now
    },
    isPinned : {
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Note = mongoose.model('Note',notesSchema);

module.exports = Note;