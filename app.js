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

var batchTable=mongoose.model("batchTable",batchSchema);

var querySchema=new mongoose.Schema({
	id: Number,
	content:String
});

var queryTable=mongoose.model("queryTable",querySchema);

app.get("/",function(req,res){
	res.render("index");
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
})


app.get("/student/dashboard",function(req,res){
	res.render("stud_dashboard.ejs");
})

app.post("/student/dashboard/book",function(req,res){
	
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
app.listen(5000,function(){

	console.log("Server started at 4000");

})
