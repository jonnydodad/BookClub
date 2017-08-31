var express    = require("express"),
    app        = express(),
    bodyParcer = require("body-parser"),
    mongoose   = require("mongoose"),
    flash     = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Book      = require("./models/book"),
    Comment   = require("./models/comment"),
    User      = require("./models/user"),
    seedDB    = require("./seeds");
  
  //require routes  
var commentRoutes = require("./routes/comments"),
    bookRoutes = require("./routes/books"),
    indexRoute = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/book_share_v2";
mongoose.connect(url);
//mongoose.connect("mongodb://jonkcoe:Morris420!@ds163053.mlab.com:63053/bookclub_v1");

app.use(bodyParcer.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret:"piles of brodrick",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoute);
 app.use("/books", bookRoutes);
app.use("/books/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log(" here we go!");
})