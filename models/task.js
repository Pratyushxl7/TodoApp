var mongoose = require("mongoose");
 
//Creating comment schema
var taskSchema = new mongoose.Schema({text: String});
 
module.exports = mongoose.model("Task", taskSchema);