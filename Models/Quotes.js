const express = require('express');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id :{
        type: Number,
        required: true,
        unique : true
    },

    quote :{
        type: String,
        required: true,
        unique : true
    },
    author : {
        type : String
    }
});

const Quotes = mongoose.model('Quotes',postSchema);

module.exports=Quotes