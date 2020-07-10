import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { UserNivelService } from 'src/app/servicesComponents/user-nivel.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-lider',
  templateUrl: './lider.component.html',
  styleUrls: ['./lider.component.scss']
})
export class LiderComponent implements OnInit {

  public data: any = { cabeza: {} };
  public url: string = environment.urlFront;
  public dataUser: any = {};
  public progress: boolean = true;

  constructor(
    private _user: UsuariosService,
    private _userNivel: UserNivelService,
    private _store: Store<STORAGES>
  ) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if (!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    this.progress = true;
    this.getCabeza();
  }

  getCabeza() {
    this._user.get({ where: { id: this.dataUser.cabeza } })
      .subscribe((res: any) => {
        res = res.data[0];
        if (!res) return false;
        this.data.cabeza = res;
        this.progress = false;
        this.getnivel(res);
      },( error:any )=> this.progress = false );
  }
  getnivel(obj: any) {
    this._userNivel.get({ where: { user: obj.id, nivel: { '!=': null } }, sort: "createdAt DESC" })
      .subscribe((response: any) => {
        response = response.data[0];
        if (!response) return false;
        this.data.cabeza.nivel = response.nivel.title;
      }
      );
  }

}
