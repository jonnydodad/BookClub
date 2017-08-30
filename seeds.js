var mongoose = require("mongoose");
var Book = require("./models/book");
var Comment = require("./models/comment"); 
 

function seedDB(){
    Book.remove({}, function(err){
        // if (err){
        //     console.log(err);
        // }else{
        //     console.log("good for u");
        // }
        //  data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if  (err){
        //                   console.log(err);
        //                 }else{
        //                     console.log("good one");
        //                     Comment.create(
        //                         {
        //                         text:"shadow of the greatestof all time pretty much ",
        //                         author:"gene wolfe"
                                   
        //                         }, function(err,comment){
        //                           if (err){
        //                               console.log(err);
        //                           }else{
        //                               campground.comments.push(comment);
        //                               campground.save();
        //                               console.log("comment created");
        //                           }
        //                       });
        //               }
                       
        //         });
        //  });
    });
    
}

module.exports = seedDB;