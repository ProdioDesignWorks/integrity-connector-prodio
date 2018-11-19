'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuidv4 = require('uuid/v4');

var Integrity = function () {
  function Integrity(config) {
    _classCallCheck(this, Integrity);

    this.config = config;
  }

  _createClass(Integrity, [{
    key: 'createMerchant',
    value: function createMerchant(payload) {
      var tmpObj = { "success": true, gatewayMerchantId: uuidv4() };
      return tmpObj;
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