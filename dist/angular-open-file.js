'use strict';

/**
 * @ngdoc service
 * @name angularOpenFile.openFile
 * @description
 * # openFile
 * Service in the angularOpenFile.
 */

angular.module('angularOpenFile', []).service('openFile', function ($q) {
  this._arrayBufferToBase64 = function (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  this.openPDF = function (data, fileName) {
    var _this = this;

    return $q(function (resolve, reject) {
      var anchor = document.createElement('a');
      var file = new Blob([data], { type: 'application/pdf' });
      anchor.target = '_blank';
      var clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
      });
      if (typeof anchor.download === 'string') {
        anchor.href = URL.createObjectURL(file);
        anchor.download = fileName;
        anchor.dispatchEvent(clickEvent);
      } else {
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file, fileName);
        } else {
          anchor.href = 'data:application/pdf;base64,' + _this._arrayBufferToBase64(data);
          anchor.dispatchEvent(clickEvent);
        }
      }
      resolve();
    });
  };
});