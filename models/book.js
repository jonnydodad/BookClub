var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    name:String,
    author:String,
    genre:String,
    image:String,
    description: String,
    submitter:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Book", bookSchema);
