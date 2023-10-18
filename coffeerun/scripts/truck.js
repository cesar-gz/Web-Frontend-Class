(function (window) {
    'use strict';
    // if window app DNE, then create an empty dictionary
    var App = window.App || {};

    function Truck(truckId, db) {
        console.log('>>> info: running Truck');
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
        };

    Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
        };

    Truck.prototype.printOrders = function (printFn) {
          return this.db.getAll().then(function (orders) {
              var customerIdArray = Object.keys(orders);
              console.log('Truck #' + this.truckId + ' has pending orders:');
              customerIdArray.forEach(function (id) {
              console.log(orders[id]);
              if (printFn) {
                printFn(orders[id]);
              }
              }.bind(this)); // before calling callback function, use this truck in this callback function
          }.bind(this));
        };

    Truck.runTests = function() {
        var App = window.App;
        var Truck = App.Truck;
        var DataStore = App.DataStore;
        var enterprise = new Truck('ncc-1705', new DataStore());

        console.log('------------- running Truck tests ------------------------')
        enterprise.createOrder({ emailAddress: 'ryker@starfleet.com', order: 'caramel macciato' });
        enterprise.createOrder({ emailAddress: 'laforge@starfleet.com', order: 'boba' });
        enterprise.createOrder({ emailAddress: 'data@starfleet.com', order: 'water' });
        enterprise.createOrder({ emailAddress: 'picard@starfleet.com', order: 'earl grey hot' });
        enterprise.createOrder({ emailAddress: 'crusher@starfleet.com', order: 'coca-cola' });
        enterprise.createOrder({ emailAddress: 'worf@starfleet.com', order: 'triple espresso' });
        enterprise.printOrders();

        enterprise.deliverOrder('laforge@starfleet.com');
        enterprise.deliverOrder('crusher@starfleet.com');
        enterprise.deliverOrder('worf@starfleet.com');
        enterprise.printOrders();

        console.log('------------ finished Truck tests ------------------------')
        };

    App.Truck = Truck;
    window.App = App;
})(window);
