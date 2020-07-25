var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");


mongoose.connect("mongodb://rajpanchal:raj123@ds023714.mlab.com:23714/cfg_dry_run",{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


var studentSchema=new mongoose.Schema({
	id:Number,
	name:String,
	email:String,
	password:String,
	level:String,
	batchid:Number,
	aadhaarid:Number,
});


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
});


app.get("/",function(req,res){
	res.render("index.ejs");
})



app.listen(5000,function(){

	console.log("Server started at 4000");

})
