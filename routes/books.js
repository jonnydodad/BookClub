var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var middleware = require("../middleware");

router.get("/", function(req,res){
    
    Book.find({}, function(err,allBooks){
        if (err){
            console.log(err);
        } else {
            res.render("books/index",{books: allBooks, currentUser: req.user});
        }
    });
});

router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("books/new");
});

router.get("/:id", function(req, res){
    //find the book with provided ID
    Book.findById(req.params.id).populate("comments").exec(function(err, foundBook){
        if(err){
            console.log(err);
        } else {
            console.log(foundBook);
            //render show template with that book
            res.render("books/show", {book: foundBook});
        }
    });
});

router.post("/",middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    name = name.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
    var author = req.body.author;
    author = author.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
    var genre = req.body.genre.toLowerCase();
    var image = req.body.image;
    var desc = req.body.description;
    var submitter ={
        id:req.user._id,
        username: req.user.username
    }
    var newBook = {name:name ,image: image, description:desc, submitter: submitter, author: author, genre: genre};
    Book.create(newBook, function(err,book){
        if (err){
            console.log(err);
        }else{
            res.redirect("/books");
        }
    });
    
});

router.get("/:id/edit", middleware.checkBookOwnership, function(req, res) {
        Book.findById(req.params.id, function(err, foundBook){
            if (err){
                console.log(err);
            }else{
                res.render("books/edit", {book: foundBook});
            }
        });
    });


router.put("/:id", middleware.checkBookOwnership, function(req, res) {
    Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedBook){
        if (err){
            res.redirect("/books");
        }else{
            res.redirect("/books/" + req.params.id);
        }
    });
    
});

router.get("/:id/related", function(req,res){
   Book.findById(req.params.id, function(err, foundBook){
            if (err){
                console.log(err);
            }else{
            
                Book.find({"genre": foundBook.genre}, function(err,allBooks){
                    if (err){
                         console.log(err);
                    } else {
                        res.render("books/related",{books: allBooks, original:foundBook, currentUser: req.user});
                    }
                });
            }
    });
});

router.get("/:id/authors", function(req,res){
   Book.findById(req.params.id, function(err, foundBook){
            if (err){
                console.log(err);
            }else{
            
                Book.find({"author": foundBook.author}, function(err,allBooks){
                    if (err){
                         console.log(err);
                    } else {
                        res.render("books/authors",{books: allBooks, original:foundBook, currentUser: req.user});
                    }
                });
            }
    });
});

//destroy
router.delete("/:id", function(req,res){
    Book.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/books");
        }else{
            res.redirect("/books");
        }
    });
});

module.exports = router;