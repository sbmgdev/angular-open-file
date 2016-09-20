'use strict';

/**
 * @ngdoc service
 * @name angularOpenFile.openFile
 * @description
 * # openFile
 * Service in the angularOpenFile.
 */
angular.module('angularOpenFile',[])
  .service('openFile', function ($q) {
    let _arrayBufferToBase64 = buffer => {  
        let binary = '';
        let bytes = new Uint8Array( buffer );
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }
    this.openPDF = function(data, fileName){
      return $q((resolve,reject)=>{
        let anchor = document.createElement('a');
        let file = new Blob([data], { type: 'application/pdf' });
        anchor.target = '_blank';
        let clickEvent = new MouseEvent("click", {
          "view": window,
          "bubbles": true,
          "cancelable": false
        });
        if(typeof anchor.download==='string'){
          anchor.href = URL.createObjectURL(file);
          anchor.download = fileName;
          anchor.dispatchEvent(clickEvent);
        }else{
          if(window.navigator.msSaveOrOpenBlob){
            window.navigator.msSaveOrOpenBlob(file, fileName);  
          }else{
            anchor.href =`data:application/pdf;base64,${arrayBufferToBase64(data)}`;
            anchor.dispatchEvent(clickEvent);
          }
        }
        resolve();
      });
    }
});