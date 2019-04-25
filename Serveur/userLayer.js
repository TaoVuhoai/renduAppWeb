
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

var UserSchema = Schema(
{
	username: String,
	password: String
});
var modeleUser = mongoose.model('users', UserSchema);
module.exports =
{
    connect: function(user, cb) 
	{
		
		modeleUser.findOne(user, function(error, user) {
			if(error)
				console.log("error");
			else{
				if(user==null){
                    cb(null);
                    console.log("user==null");
				}
				else{
					cb(user.username);
				}

			}

		});
    },
    addUser: function(user, cb) 
	{
        console.log("layer add");
		var userToAdd = new modeleUser({
			username: user.username,
			password: user.password
		});
		userToAdd.save(function(error) {
			if(error)
				console.log(error);
			else {
				if(user==null)
					cb(false);
				else
					cb(true);
			}
		});
    },
  
}