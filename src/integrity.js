const uuidv4 = require('uuid/v4');

export default class Integrity {
  constructor(config) {
    this.config = config;
  }

  createMerchant(payloadJson){
    let tmpObj = {"success":true,gatewayMerchantId: uuidv4()};
  	return payloadJson;
  }

  updateMerchant(){
  	return 'This is from Integrity';
  }

  deleteMerchant(){
  	return 'This is from Integrity';
  }
}