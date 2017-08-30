var Book = require("../models/book");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkBookOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Book.findById(req.params.id, function(err, foundBook){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the book?
            if(foundBook.submitter.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","you dont have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.submitter.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "please login!");
    res.redirect("/login");
}

module.exports = middlewareObj;