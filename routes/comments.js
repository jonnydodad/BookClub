var express = require("express");
var router = express.Router({mergeParams: true});
var Book = require("../models/book");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn, function(req, res) {
    
    Book.findById(req.params.id, function(err, book){
        if (err){
            console.log(err);
        } else{
            res.render("comments/new", {book: book});
        }
    });
    
});

router.post("/",middleware.isLoggedIn, function(req, res){
    Book.findById(req.params.id, function(err, book) {
        if (err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err,comment){
                if (err){
                    console.log(err);
                }else{
                    //add user name and id comment
                    comment.submitter.id = req.user._id;
                    comment.submitter.username = req.user.username;
                    comment.date = Date();
                    comment.save();
                    book.comments.push(comment);
                    book.save();
                    res.redirect('/books/'+ book._id);
                }
            });
        }
    });
});
//comments edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {book_id: req.params.id, comment: foundComment});
        }
    });
});
//comments update
router.put("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err){
            res.redirect("back");
        }else{
            res.redirect("/books/"+req.params.id);
        }
    });
});
//comments destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            res.redirect("back");
        }else{
            res.redirect("/books/"+req.params.id);
        }
    });
    
});

module.exports = router;