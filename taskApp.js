var express=require('express');
var app=express();
app.use(express.static("public"));
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var mongoose=require("mongoose");

//Importing task from models
var taskList=require("./models/task.js");

//Initializing tasks so that we dont have an empty DB
// var data=[{text:"Task 1"}, {text:"Task 2"}];

//Seeding taskList collection
// taskList.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("Cleared TaskList");
// 		data.forEach(function(eachTask){
// 			taskList.create(eachTask);
// 			console.log("A task added!!!");
// 		})});


app.get("/", function(request, response){
	var name_of_db="";
	response.render("user");
});

app.post("/", function(request, response){
	var name_of_db="";
	var name_of_db=request.body.name_of_user;
	var password="suzukixl7";
	mongoose.connect("mongodb+srv://Pratyush:"+password+"@cluster0-yxbyk.mongodb.net/"+name_of_db+"?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}).then(()=>
{console.log("Connected to DB!");}).catch(err => 
{
	console.log("Error while connecting to DB:", err.message);
});
	
	response.redirect("/homepage");
	
});


app.get("/homepage", function(request, response){
	taskList.find({}, function(err, tasks)
	{
		if(err)
		{
			console.log("Error====>"+err);
		}
		else
		{
			console.log(tasks);
			response.render("todos", {passedTasks:tasks});
		}
	})
});

app.post("/add", function(request, response){
	taskList.create({text:request.body.newTask}, function(err, item_ret){
		if(err)
		{
			console.log("Error in creating task:"+err);
		}
		else
		{
			console.log("Task created:"+ item_ret);
			item_ret.save();
		}
	});
});

app.post("/remove", function(request, response){
	taskList.deleteOne({text:request.body.itemtoremove}, function(err){
		if(err)
		{
			console.log("Error in removing task:"+err);
		}
		else
		{
			console.log("Task removed:"+ request.body.itemtoremove);
		}
	})});

app.listen(3000, process.env.IP, function(){
	console.log("The ToDo server has started!");
});