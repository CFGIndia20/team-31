tart
ar express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");

mongoose.connect("mongodb://rajpanchal:raj123@ds023714.mlab.com:23714/cfg_dry_run",{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require("express-session")({
	secret: "CFG",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var studentSchema=new mongoose.Schema({
	id:Number,
	name:String,
	email:String,
	password:String,
	level:String,
	batchid:Number,
	aadhaarid:Number,
});
studentSchema.plugin(passportLocalMongoose);
var studentTable=mongoose.model("studentTable",studentSchema);

var teacherSchema=new mongoose.Schema({
	id:Number,
	name:String,
	email:String,
	password:String,
	batchid:Array,
	preference:String,
});

var teacherTable=mongoose.model("teacherTable",teacherSchema);


var adminSchema=new mongoose.Schema({
	id:Number,
	name:String,
	email:String,
	password:String,
});

var adminTable=mongoose.model("adminTable",adminSchema);

var batchSchema=new mongoose.Schema({
	id:Number,
	name:String,
});

<<<<<<< HEAD

app.get("/",function(req,res){
<<<<<<< HEAD
	res.render("index.ejs");ls
=======
	res.render("landing");
>>>>>>> ec9723b827e1ea6e039029a0f3f65560b3218150
})

app.get("/secret",(req,res)=>{
	res.render("secret");
});

<<<<<<< HEAD
app.listen(5000,function(){
=======
app.listen(3000, ()=>{
	console.log(`Server has started on port`);
=======
app.listen(3000,function(){
>>>>>>> ec9723b827e1ea6e039029a0f3f65560b3218150
	console.log("Server started at 4000");
>>>>>>> 0d9a9e64013afac6e17a4fb4c0b3a5cc0a07dbd8
})
