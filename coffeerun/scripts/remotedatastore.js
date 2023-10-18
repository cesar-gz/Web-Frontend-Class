(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url){
        if(!url){
            throw new Error('No remote URL supplied.');
        }

        this.serverURL = url;

        App.RemoteDataStore = RemoteDataStore;
        window.App = App;
    }

    RemoteDataStore.prototype.add = function(key, val) { return $.post(this.serverURL, val, function(serverResponse){
        console.log(serverResponse);
        }); 
    };

    RemoteDataStore.prototype.get = function(key) { return $.get(this.serverURL + '/' + key, function(key, cb){
        if(cb){
            console.log(serverResponse);
            cb(serverResponse);
        }
        });
    };
    
    RemoteDataStore.prototype.remove = function(key) { return $.ajax(this.serverUrl + '/' + key, {
        type: 'DELETE'
        });
    };
    
    RemoteDataStore.prototype.getAll = function(cb) { return $.get(this.serverURL, function(serverResponse){
        if(cb){
            console.log(serverResponse);
            cb(serverResponse);
        }
        });
    };

})(window);