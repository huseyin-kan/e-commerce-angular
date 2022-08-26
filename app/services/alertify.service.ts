import { Injectable } from '@angular/core';
declare let alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message:string){
    alertify.success(message);
  }
  error(message:string){
    alertify.error(message)
  }
  alert(message:string){
    alertify.alert(message, function(){
  });
  }
  confirm(message:string){
    alertify.confirm(message,
  function(){
    alertify.success('Ok');
  },
  function(){
    alertify.error('Cancel');
  });
  }
}
