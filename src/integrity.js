const uuidv4 = require('uuid/v4');
const axios = require('axios');
const { MASTER_MERCHANT_ACCESS} = require('./config/constant.js');
const isNull = function (val) {
  if (typeof val === 'string') { val = val.trim(); }
  if (val === undefined || val === null || typeof val === 'undefined' || val === '' || val === 'undefined') {
    return true;
  }
  return false;
};

export default class Integrity {
  constructor(config) {
    this.config = config;
  }

  createMerchant(payloadJson){
    return new Promise((resolve, reject) => {
      let payload = {
        username: MASTER_MERCHANT_ACCESS["BoardingAPIsUserName"],
        password: MASTER_MERCHANT_ACCESS["BoardingAPIsPassword"],
      };

      axios.post(MASTER_MERCHANT_ACCESS["BoardingAuthAPIURL"], payload).then(response => {
        console.log(" \n \n res==>"+JSON.stringify(response["data"]));
        if(!isNull(response["responseStatus"])){
          return reject({
            "success": false,
            "message": response["responseStatus"]["message"],
            "error": response["responseStatus"]["errorCode"],
          });
        }else{
          console.log(" \n \n reads==>"+JSON.stringify(response["data"]));
          
          let bearerToken = response["data"]["bearerToken"];
          var config = {
            headers: {
              'Content-Type':'application/json',
              'Authorization': "bearer " + bearerToken
            }
          };

          let createMerchantJson = {
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
              "OwnerContacts": [
                 {
                    "firstName": payloadJson["basic"]["firstName"],
                    "lastName": payloadJson["basic"]["lastName"],
                    "email":payloadJson["basic"]["email"],
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
                  }
              ],
              "BankAccount": {
                "NameOnAccount": (!isNull(payloadJson["basic"]["accountName"]))?payloadJson["basic"]["accountName"]:payloadJson["basic"]["firstName"],
                "RoutingNumber": (!isNull(payloadJson["billing"]["routingNumber"]))?payloadJson["billing"]["routingNumber"]:"",
                "AccountNumber": (!isNull(payloadJson["billing"]["accountNumber"]))?payloadJson["billing"]["accountNumber"]:""
              },
              "FedTaxId": (!isNull(payloadJson["billing"]["fedTaxId"]))?payloadJson["billing"]["fedTaxId"]:""
          };

          console.log(createMerchantJson);
          console.log(config);
          console.log(MASTER_MERCHANT_ACCESS["BoardingCreateMerchantURL"]);

          axios.post(MASTER_MERCHANT_ACCESS["BoardingCreateMerchantURL"], createMerchantJson,config).then(
            merchantResponse => resolve({
                "success":true,
                "KEY":"!11",
                "body": merchantResponse["data"],
              })
            ).catch(
              error => reject({
                "success":false, 
                "KEY":"222",
                "message": error["response"]["data"]["responseStatus"]["message"]
              })
            );
        }
      })
      // }).catch(
      //   error => reject({
      //     "success": false, 
      //     "KEY":"333",
      //     "message": JSON.stringify(error)
      //   })
      // );
    });
  }

  updateMerchant(payloadJson){
  	return 'This is from Integrity';
  }

  deleteMerchant(payloadJson){
  	return 'This is from Integrity';
  }

  getMerchantId(payloadJson){
    return 'this is tes';
  }

  getMerchantActionvationStatus(payloadJson){
    return 'this is tes';
  }

  getMerchantProfile(payloadJson){
    return 'this is test';
  }

  createPayer(payloadJson){
    return 'this is test';
  }

  bulkUploadPayers(payloadJson){
    return 'this is test';
  }

  createPaymentTransaction(payloadJson){
    return 'this is test';
  }
}