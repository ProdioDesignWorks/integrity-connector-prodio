'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuidv4 = require('uuid/v4');
var axios = require('axios');

var _require = require('./config/constant.js'),
    MASTER_MERCHANT_ACCESS = _require.MASTER_MERCHANT_ACCESS;

var isNull = function isNull(val) {
  if (typeof val === 'string') {
    val = val.trim();
  }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};

var Integrity = function () {
  function Integrity(config) {
    _classCallCheck(this, Integrity);

    this.config = config;
  }

  _createClass(Integrity, [{
    key: 'createMerchant',
    value: function createMerchant(payloadJson) {
      return new Promise(function (resolve, reject) {
        var payload = {
          username: MASTER_MERCHANT_ACCESS["BoardingAPIsUserName"],
          password: MASTER_MERCHANT_ACCESS["BoardingAPIsPassword"]
        };

        axios.post(MASTER_MERCHANT_ACCESS["BoardingAuthAPIURL"], payload).then(function (response) {
          console.log(" \n \n res==>" + JSON.stringify(response["data"]));
          if (!isNull(response["responseStatus"])) {
            return reject({
              "success": false,
              "message": response["responseStatus"]["message"],
              "error": response["responseStatus"]["errorCode"]
            });
          } else {
            console.log(" \n \n reads==>" + JSON.stringify(response["data"]));

            var bearerToken = response["data"]["bearerToken"];
            var config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + bearerToken
              }
            };

            var createMerchantJson = {
              "DoingBusinessAs": payloadJson["business"]["businessName"],
              "LegalBusinessName": payloadJson["business"]["dbaName"],
              "LegalBusinessAddress": {
                "AddressLine1": payloadJson["business"]["address"]["streetAddress"],
                "City": payloadJson["business"]["address"]["city"],
                "Zip": payloadJson["business"]["address"]["zipCode"],
                "State": payloadJson["business"]["address"]["state"]
              },
              "DbaAddress": {
                "AddressLine1": payloadJson["business"]["address"]["streetAddress"],
                "City": payloadJson["business"]["address"]["city"],
                "Zip": payloadJson["business"]["address"]["zipCode"],
                "State": payloadJson["business"]["address"]["state"]
              },
              "OwnerContacts": [{
                "firstName": payloadJson["basic"]["firstName"],
                "lastName": payloadJson["basic"]["lastName"],
                "email": payloadJson["basic"]["email"],
                "phone": payloadJson["basic"]["mobileNumber"],
                "address": {
                  "addressLine1": payloadJson["business"]["address"]["streetAddress"],
                  "city": payloadJson["business"]["address"]["city"],
                  "zip": payloadJson["business"]["address"]["zipCode"],
                  "state": payloadJson["business"]["address"]["state"]
                },
                "equityPercentage": 100,
                "isPrimaryContact": true,
                "SSN": payloadJson["basic"]["ssn"]
              }],
              "BankAccount": {
                "NameOnAccount": !isNull(payloadJson["basic"]["accountName"]) ? payloadJson["basic"]["accountName"] : payloadJson["basic"]["firstName"],
                "RoutingNumber": !isNull(payloadJson["billing"]["routingNumber"]) ? payloadJson["billing"]["routingNumber"] : "",
                "AccountNumber": !isNull(payloadJson["billing"]["accountNumber"]) ? payloadJson["billing"]["accountNumber"] : ""
              },
              "FedTaxId": !isNull(payloadJson["billing"]["fedTaxId"]) ? payloadJson["billing"]["fedTaxId"] : ""
            };

            console.log(createMerchantJson);
            console.log(config);
            console.log(MASTER_MERCHANT_ACCESS["BoardingCreateMerchantURL"]);

            axios.post(MASTER_MERCHANT_ACCESS["BoardingCreateMerchantURL"], createMerchantJson, config).then(function (merchantResponse) {
              return resolve({
                "success": true,
                "KEY": "!11",
                "body": merchantResponse["data"]
              });
            }).catch(function (error) {
              return reject({
                "success": false,
                "KEY": "222",
                "message": error["response"]["data"]["responseStatus"]["message"]
              });
            });
          }
        });
        // }).catch(
        //   error => reject({
        //     "success": false, 
        //     "KEY":"333",
        //     "message": JSON.stringify(error)
        //   })
        // );
      });
    }
  }, {
    key: 'updateMerchant',
    value: function updateMerchant() {
      return 'This is from Integrity';
    }
  }, {
    key: 'deleteMerchant',
    value: function deleteMerchant() {
      return 'This is from Integrity';
    }
  }]);

  return Integrity;
}();

exports.default = Integrity;