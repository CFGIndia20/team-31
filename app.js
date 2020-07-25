var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var	passport = require('passport');
var	LocalStrategy = require('passport-local');
var	passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect('mongodb://rajpanchal:raj123@ds023714.mlab.com:23714/cfg_dry_run', {useNewUrlParser: true}, function(err) {
	console.log(err);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require('express-session')({
	secret: 'CFG',
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
	aadhaarid:Number
});
studentSchema.plugin(passportLocalMongoose);

var studentTable=mongoose.model("studentTable",studentSchema);

passport.use(new LocalStrategy(studentTable.authenticate()));
passport.serializeUser(studentTable.serializeUser());
passport.deserializeUser(studentTable.deserializeUser());

var teacherSchema=new mongoose.Schema({
	id:Number,
	name:String,
	email:String,
	password:String,
	batchid:Array,
	preference:String,
	slots:Array,
	tSlot:Number,
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
	slot_id:Number,
	teacher_id:Number,
});


app.get("/",function(req,res){
	res.render("index1");
})

app.post("/login",function(req,res){
	var option=req.body.option;
	if(option=="student")
		{
			res.redirect("/student/dashboard");
		}
	
	if(option=="teacher")
		{
			res.redirect("/teacher/dashboard");
		}
	
	if(option=="admin")
		{
			res.redirect("/admin/dashboard");
		}
})

app.get("/student/login",function(req,res){
	res.render("stud_signup");
	res.render("index.ejs");

})




app.get("/teacher/dashboard",function(req,res){
	//res.render();
})

app.post("/teacher/query",function(req,res){
	var ob1=req.body.obj; 
	queryTable.create(ob1,function(err,newQuery){
		if(err){
			console.log(err);
		}
		else{
			
			res.redirect("/teacher/dashboard");
		}
	})
})

app.get("/teacher/timetable",function(req,res){
	//res.render();
})

app.get("/admin/dashboard",function(req,res){
	//res.render();
})

app.post("/admin/dashboard/resolve",function(req,res){
	//res.render();
})
app.listen(4000,function(){



	console.log("Server started at 4000");

})
