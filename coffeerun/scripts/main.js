(function (window) {
    "use strict";
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'https://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    var remoteDS = new RemoteDataStore(SERVER_URL);

    var enterprise = new Truck('ncc-1701', new DataStore());
    window.enterprise = enterprise;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(enterprise.deliverOrder.bind(enterprise));

    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data){
      return enterprise.createOrder.call(enterprise, data)
      .then( function(){
        checkList.addRow.call(checkList, data);
      },
      function(){
        alert('Server unreachable. Try again later.');
      });
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    enterprise.printOrders(checkList.addRow.bind(checkList))

    //console.log(formHandler);
  })(window);
