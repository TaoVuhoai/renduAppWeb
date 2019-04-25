
var mongoose = require("mongoose");
var url="mongodb+srv://Tao-vu:Vuho@it@o06010797@cluster0-2kaqz.mongodb.net/Poly?retryWrites=true";
mongoose.connect(url, {useNewUrlParser:true}, function (err) {
    if(err){
        throw err;
    }else{
        console.log('mongo connected');
    }
});

var Schema = mongoose.Schema;

var TaskSchema = Schema(
    {
        _id: String,
		name: String,
		done : Boolean,
		username:String
	});
	
	var TaskListSchema = Schema({
			_id: String,
			name: String,
			username:String,
			task :[{
				_id :String,
				name :String,
				done : Boolean
		}]
		});


var modeleTask = mongoose.model('tasks' , TaskListSchema);


module.exports = 
{
   
    getTaskSet : function(username,cb){
		
        modeleTask.find({username : username},function(error, tasks){
			if(error)
				console.log('error load');
			else
				cb(tasks);
		});
	},
	getListSet : function(username,cb){
		
        modeleTask.find({username : username},function(error, list){
			if(error)
				console.log('error load');
			else
				cb(list);
		});
    },
    addTask : function(task,id_list,cb){
        console.log("addTask Layer");
		var taskToAdd ={
			_id : task._id,
		    name : task.name,
			done : task.done
		};
		console.log(taskToAdd);
		modeleTask.findOneAndUpdate({_id : id_list},{$push:{task:taskToAdd}},function(error,task){
			if(error){   
                cb(false);
            }
			else
				cb(true);
		});
	},
	addList : function(list,cb){
        console.log("list added")
		var listToAdd = new modeleTask({
			_id : list._id,
		    name : list.name,
			username : list.username,
        });
		listToAdd.save(function(error){
			if(error){
                
                cb(false);
            }
				
			else
				cb(true);
		});
    },
    deleteTask: function(list_id,task_id, cb)
	{
		console.log(list_id  +"    task : "+ task_id)
		modeleTask.findOneAndUpdate({_id : list_id},{$pull : { task : { _id :task_id} }},function(error, task){
			if(error)
				console.log('error');
			else{
				if(task != null)
					cb(true);
			}
		});
	},
	deleteList: function(id, cb)
	{
		modeleTask.findByIdAndDelete(id, function(error, todo){
			if(error)
				console.log('error');
			else{
				if(todo != null)
					cb(true);
			}
		});
	},
	
    modifTask: function(liste_id,task_id,name, cb)
	{
		console.log("liste_id :  " + liste_id +"task_id :" + task_id+" name: " +name)
		modeleTask.findOneAndUpdate({_id: liste_id, 'task._id':task_id},{$set:{'task.$.name':name}}, function(error,task) {
			if(error)
				console.log('error update');
			else
				if(task != null)
					cb(true);
				else 
					console.log("pas trouvé");
		})
	},
	modifDone: function(liste_id,task_id,done, cb)
	{
		console.log("liste_id :  " + liste_id +"task_id :" + task_id+" done: " +done)
		modeleTask.findOneAndUpdate({_id: liste_id, 'task._id':task_id},{$set:{'task.$.done':done}}, function(error,task) {
			if(error)
				console.log('error update');
			else
				if(task != null)
					cb(true);
				else 
					console.log("pas trouvé");
		})
	}
    
     
        


}
