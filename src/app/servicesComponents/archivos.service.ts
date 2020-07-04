import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import * as firebase from "firebase/app";
import 'firebase/storage'; 

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(
    private _model: ServiciosService
  ) { }
  
  create(query:any){
    //this.FileFirebase( query );
    return this._model.querys('archivos/file',query, 'post');
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  FileFirebase( ev:any ){
    var firebaseConfig = {
      apiKey: "AIzaSyB5D8M8DRxmHU_Awwo7Yk41ei_Me0RU5Io",
      authDomain: "locomproaqui-e5fb7.firebaseapp.com",
      databaseURL: "https://locomproaqui-e5fb7.firebaseapp.com/",
      storageBucket: "locomproaqui-e5fb7.appspot.com"
    };
    firebase.initializeApp(firebaseConfig);
    let storageRef = firebase.storage().ref('images/'+ev.name || 'pruebas');

    let task = storageRef.put(ev).then(res=>console.log(res));


  }


  
}
