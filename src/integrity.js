const uuidv4 = require('uuid/v4');

export default class Integrity {
  constructor(config) {
    this.config = config;
  }

  createMerchant(payload){
    let tmpObj = {"success":true,gatewayMerchantId: uuidv4()};
  	return tmpObj;
  }

  updateMerchant(){
  	return 'This is from Integrity';
  }

  deleteMerchant(){
  	return 'This is from Integrity';
  }
}