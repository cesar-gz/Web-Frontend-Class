(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector){
            throw new Error('No selector provided in FormHandler');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0){
            throw new Error('Could not find elements with selector' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            var i = 0

            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);

                // this section is to add the title and name for payment-form.html's modal
                if ($('#payment-Modal').length) {
                  var modalInfo = document.getElementById("payment-Modal");
                  // if i == 1, add the Name. if i == 0, add the Title
                  if (i == 1) {
                    modalInfo.textContent += " " + item.value;
                    i++;
                  }
                  if (i == 0) {
                    modalInfo.textContent += " " + item.value;
                    i++;
                  }
                }

            })

            console.log(data);

            // callback function will process the data
            fn(data).then(function () {
              this.reset(); // will reset the form for new orders to come through
              this.elements[0].focus(); // set auto focus to the "Coffee Order" label after the reset
            }.bind(this));

            // open the modal if we are using the payment-form.html
            if ($('#payment-Modal').length) {
                $('#payment-Modal').appendTo('body').modal();
            }
        });
    }

    FormHandler.prototype.addInputHandler = function(fn){
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event){
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)){
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!'
                event.target.setCustomValidity(message);
            }
        });
    }

    FormHandler.runTests = function() {
        var fh = new App.FormHandler('[data-coffee-order="form"]');
        fh.addSubmitHandler();
    }

    App.FormHandler = FormHandler;
    window.App = App;
   })(window);
