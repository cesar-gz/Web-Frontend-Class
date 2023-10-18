(function (window) {
    'use strict';
    // if window app DNE, then create an empty dictionary
    var App = window.App || {};

    var Promise = window.Promise;

    function DataStore() {
        console.log('>>> info: running DataStore');
        this.data = {};
    }

    function promiseResolvedWith(value){
        var promise = new Promise(function (resolve, reject) {
          this.data[key] = val;
          resolve(value);
        }.bind(this));
        return promise;
    }

    DataStore.prototype.add = function (key, val) {
      return promiseResolvedWith(null);
    };

    DataStore.prototype.get = function (key) {
      return promiseResolvedWith(this.data[key]);
    };
    DataStore.prototype.remove = function (key) {
      delete this.data[key];
      return promiseResolvedWith(null);
    };
    DataStore.prototype.getAll = function () {
      return promiseResolvedWith(this.data);
    };

    App.DataStore = DataStore;
    window.App = App;
})(window);
