const express = require('express');
const session =require("express-session");
const cool = require('cool-ascii-faces')
var path = require('path');
var uuidv4 = require("uuid/v4");

var bodyParser = require('body-parser');

var dataLayer= require("./Serveur/dataLayer.js");
var userLayer= require("./Serveur/userLayer.js");

var app=express();
var  port = process.env.PORT || 3000;

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(session({
	secret :"osef je crois ",
	resave : false,
	saveUninitialized:false

}));

//Add headers for Ionic
app.use(function(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    //Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "POST");

    //Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-requested-with,content-type");

    next();
});
app.post('/addList', function(req, res) {
	if(!req.body.name)
	{
		
		res.send({success:false, error: "nom de liste manquant"});
	}
	else
	{
    
		
		var list = {
			_id : uuidv4(),
			name : req.body.name,
			username : req.body.username

		}
		dataLayer.addList(list, function(success)
		{
			console.log(success);
			res.send({success: success});
		});	
	}
});





app.post('/addTask', function(req, res) {
	
	console.log(req);
    if(!req.body.name)
	{
		console.log("addTaskapp")
		res.send({success:false, error:	 "Tache manquante"});
	}
	else
	{
		
		var task = {
			_id : uuidv4(),
			name : req.body.name,
			done : req.body.done,
		}
		console.log(task);
		dataLayer.addTask(task,req.body.id_list, function(success)
		{
			console.log(success);
			res.send({success: success});
		});
	}		
});

app.get('/getTaskSet', function(req,res){
    dataLayer.getTaskSet(req.session.user.username,function(dtSet){
        res.send(dtSet);
    }) 
});


app.get('/getListSet', function(req,res){
    dataLayer.getListSet(req.session.user.username,function(dtSet){
        res.send(dtSet);
    }) 
});

app.post('/deleteTask', function(req, res){
	if(!req.body.id_task){
		res.send({success:false, error: "ID inexistant"});
	}
	else{
		dataLayer.deleteTask(req.body.id_list,req.body.id_task, function(success){
			res.send({success: success});
		});
	}
});
app.post('/deleteList', function(req, res){
		dataLayer.deleteList(req.body.id, function(success){
			res.send({success: success});
		});
});

app.post('/modifTask', function(req, res) {
	
	
	dataLayer.modifTask(req.body.liste_id,req.body.task_id,req.body.name,function(success) {
		console.log(success);
		res.send({success: success});
	});
	dataLayer.modifDone(req.body.liste_id,req.body.task_id,req.body.done,function(success) {
		console.log(success);
		res.send({success: success});
	});

});

app.post('/connect', function(req, res) {
	console.log("app connect")
	var user = {
		username : req.body.username,
		password : req.body.password
	}
	
	userLayer.connect(user, function(username) {
		
		if(username != null){
			req.session.user=user;
		}
		res.send({
			success:(username != null),
			username: username
			});
	});
});

app.get('/getUser', function(req,res){
	res.send(req.session.user);

});
app.get('/disconnect',function(req,res){
	req.session.destroy();
	res.send(true);
})
app.post('/addUser', function(req, res) {
	
	req.session.user=user;
	var user = {
		username: req.body.username,
		password: req.body.password
	};
	userLayer.addUser(user, function(success) {
		res.send({success: success});
	});
});


console.log("Le serveur est lancé sur le port " + port );
app.listen(port);
/*app.listen(port , function(){
    console.log("Example app listening on port: "+ port)
});*/
