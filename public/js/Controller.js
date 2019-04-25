
var TaskApp = angular.module('MyApp', []);

TaskApp.controller('Ctrl',['$scope', '$http', 'Service', function($scope, $http, Service) {	

	$scope.getUser = function(){
		$http.get('/getUser').then(function(resp){
			$scope.user=resp.data;
			console.log($scope.user);
			//$scope.getTaskset();
			$scope.getListset();

		});
	};
	$scope.getUser();
	
	$scope.getListset = function(){
		$http.get('/getListSet').then(function(resp){
			$scope.listSet=resp.data;
		});
	};
	
		
	$scope.addList = function(username)
	{
		Service.addList($scope.listName, username,function(res){
            if(res){
                console.log("liste ajoutée");
            }
		});
		$scope.getListset();
	};


	$scope.addTask = function(username, id_list)
	{
		var object = new Object();
		object.name = document.getElementById(id_list).value;
		object.username=username;

		Service.addTask(object.name, username,id_list,function(res){
            if(res){
				console.log("tâche ajoutée");
				$scope.getListset();
            }
		});
	};

	
	

	$scope.deleteTask = function($id_list,$id_task) {
	
		Service.deleteTask($id_list,$id_task, function(res){
			if(res){
				console.log("tâche supprimée");
				$scope.getListset();
			}
		})
		
		
	};

	$scope.deleteList = function($id) {
		console.log($id+"hhuhuhuhhuhuhuhuhuhu")
		Service.deleteList($id, function(res){
			if(res){
				console.log("liste supprimée");
			}
		})
		$scope.getListset();
		
	};
	$scope.Taskdone = function(list_id,$task) {
		var modiftext = document.getElementById($task._id);
		//css mettre en vert + desactivé changement
		modiftext.value="La tâche est terminée";
		Service.modifTask(list_id,$task.id,$task.name,true,$task.username,function(res){
			if(res){
				console.log("tâche done");
			}
		})
	};
	
	$scope.modifTask = function(list_id,task_id,username) {
		console.log(list_id);
		var newName = document.getElementById(task_id);
		done=false
		Service.modifTask(list_id,task_id,newName.value ,done,username,function(res)
		{
			console.log("tache modifiée");
		});
	$scope.getListset();

	};

	

	$scope.disconnect=function() {
		$http.get('/disconnect').then(function(success){
			if(success){
				console.log("Deconnécté");
				window.location.href = "/index.html";
			}
			else{
				alert("deconnection impossible  ");
			}
		});
	};

	
    	


}]);

TaskApp.controller('userCtrl',['$scope', '$http', 'Service', function($scope, $http, Service) {

	

	$scope.connect = function() {
		console.log("connected");
		var user = {
		username: $scope.username,
		password: $scope.password
		};
		
		Service.connect(user, function(success) {
			if(success){
				console.log("utilisateur trouvé");
				window.location.href = "/home.html";
			}
			else{
				alert("Pas d'utilisateur correspondant")
			}
		});
	
	};

	$scope.createAccount = function() {
		if($scope.password==$scope.passwordVerif){
			var user = {
				username: $scope.username,
				password: $scope.password
			};
			Service.addUser(user, function(res) {
				if(res)
					console.log("utilisateur ajouté");
					//$scope.connect(user);
					window.location.href = "/index.html";
			});
			
		}
		else{
			//erreur + mettre en rouge 
		}
	}

	


}]);
