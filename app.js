console.log("Welcome to The Nudge Web App");
var express=require("express");
var app=express();
var request=require("request");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});

var studentSchema=new mongoose.Schema({
	id:Number,
	name:String,
	email:String,
	password:String,
	level:String,
	batchid:Number,
	aadhaarid:Number,
});

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

var studentTable=mongoose.model("studentTable",studentSchema);

var adminSchema=new mongoose.Schema({
	id:Number,
	name:String,
	email:String,
	password:String,
});

var adminTable=mongoose.model("adminTable",adminSchema);


