TaskApp.factory('Service',['$http',function($http){
    var server = {};
    server.username = undefined;

    
    server.addTask = function (name,username,id_list, cb) {
        var req = {
            name : name,
            done : false,
            username : username,
            id_list : id_list
        };
        console.log(req);
        $http.post('/addTask', req)
            .then(function (res) {
                cb(res);
            });
        };
    server.addList = function(name,username, cb) {
       
         var req = {
            name : name,
            username : username
        };
        $http.post('/addList', req)
            .then(function(res) {
                cb(res);
            });
    };
    server.deleteTask = function($id_list,$id_task, cb ){
        var req = {
            id_list : $id_list,
            id_task : $id_task
        };
        $http.post('/deleteTask', req)
            .then(function(res) {
                cb(res);
            });
    }
    server.deleteList = function(id, cb ){
        var req = {
            id : id
        };
        $http.post('/deleteList', req)
            .then(function(res) {
                cb(res);
            });
    }
    server.modifTask = function(liste_id, task_id, newName,done,username, cb) {
        var req = {
            liste_id : liste_id,
            task_id :task_id,
            name : newName,
            done : done,
            username : username
        };
        $http.post('/modifTask', req)
            .then(function(res) {
                cb(res);
            });
    };
    server.connect = function(user, cb) {
        console.log("servc")
        var req = {
            username : user.username,
             password : user.password
         };
         $http.post('/connect', req)
             .then(function(res) {
                 cb(res.data.success);
             });
     };
     server.addUser = function(user, cb) {
       
        var req = {
            username : user.username,
            password : user.password
        };
        $http.post('/addUser', req)
            .then(function(res) {
                cb(res);
            });
    };
    




    return server;



}]);