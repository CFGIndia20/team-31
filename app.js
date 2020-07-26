var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var	passport = require('passport');
var	LocalStrategy = require('passport-local');
var	passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds023714.mlab.com:23714/cfg_dry_run`, {  useCreateIndex: true,
useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	console.log(err);
});
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
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

app.get("/student/login",function(req,res){
	res.render("stud_signup");
})

app.get("/teacher/login",function(req,res){
	console.log("hi Raj");
	res.render("teach_signup");
})

app.get("/admin/login",function(req,res){
	res.render("admin_signup");
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
	res.render("index.ejs");

})


app.post("/student/signup",(req,res)=>{
	var temp=req.body;
	var newStud = new studentTable({
		"_id": new studentTable(),
		name:temp.name,
		password:temp.pass,
		batchid:temp.batchid
	}, { unique: true } );
	console.log(newStud);
	newStud.save(function (err, book) {
      if (err) return console.error(err);
      console.log(book.name + " saved to collection.");
      res.render("stud_dashboard");
    });

	
});

app.get("/student/dashboard",function(req,res){
	res.render("stud_dashboard.ejs");
})

app.get("/student/companies/visited",function(req,res){
	res.render("showvisitedcompany.ejs")
})

app.get("/student/companies/eligible",function(req,res){
	res.render("showeligiblecompany.ejs")
})

app.get("/student/companies/placed",function(req,res){
	res.render("showplacedcompany.ejs")
})

app.get("/student/companies/applied",function(req,res){
	res.render("showappliedcompany.ejs")
})


app.get("/student/placements",function(req,res){
	res.render("s_place")
})

app.get("/teacher/dashboard",function(req,res){
	res.render("teach_tt");
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
	res.render("admin_dashboard");
})

app.post("/admin/dashboard",function(req,res){
	res.render("admin_dashboard");
})



app.get("/admin/placements",function(req,res){
	res.render("a_place.ejs")
})

app.get("/admin/placements/companyform",function(req,res){
	res.render("company_form")
})

app.post("/admin/placements",function(req,res){
	res.render("a_place")
})




app.post("/admin/dashboard/resolve",function(req,res){
	//res.render();
})
app.listen(4500,function(){
	console.log("Server started at 4000");
})
