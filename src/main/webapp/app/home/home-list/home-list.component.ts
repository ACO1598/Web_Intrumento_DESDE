/* eslint-disable no-console */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';
import { ISeccion, Seccion } from 'app/entities/seccion/seccion.model';
import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ClasificadorService } from 'app/entities/clasificador/service/clasificador.service';
import { IIdentificador } from 'app/entities/identificador/identificador.model';
import { IdentificadorService } from 'app/entities/identificador/service/identificador.service';

import { HomeListElement, IHomeListElement, IHomeListArray, HomeListArray } from './home-list.model';
import { HomeElementComponent } from '../home-element/home-element.component';
//import { resolve } from 'path';

@Component({
  selector: 'jhi-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent {
  codigoDESDES: ICodigoDESDE[] = [];
  seccions: ISeccion[] = [];
  clasificadores: IClasificador[] = [];
  identificadores: IIdentificador[] = [];
  HomeArray: IHomeListArray[] = [];

  @Output() msgToHome = new EventEmitter<any>();

  constructor(
    protected codigoDESDEService: CodigoDESDEService,
    protected seccionService: SeccionService,
    protected clasificadorService: ClasificadorService,
    protected identificadorService: IdentificadorService
  ) {}

  ngOnInit(): void {
    this.getelementos();
  }

  ordenarJerarquias(secciones: ISeccion[], clasificadores: IClasificador[], identificadores: IIdentificador[]): void {
    let i = 0;
    for (const seccion of secciones) {
      if (seccion.nombre !== undefined && seccion.descripcion) {
        const arrayElement = new HomeListArray(i, seccion.nombre, undefined, seccion.descripcion);
        this.HomeArray.push(arrayElement);
        i++;
      }
    }
  }

  getelementos(): void {
    /*     try{
      await this.getcodigos();
    }catch (e){
      console.log('Error in codigos');
    }finally{
      console.log(this.codigoDESDES); 
    } */

    this.getsecciones();
    console.log(this.seccions);
    this.getclasificadores();
    console.log(this.clasificadores);
    this.getidentificadores();
    console.log(this.identificadores);

    if (this.seccions.length !== 0 && this.clasificadores.length !== 0 && this.identificadores.length !== 0) {
      //pasamos datos vacios para realizar el codigo hasta haber resuelto la sincronia
      this.ordenarJerarquias([], [], []);
    }
  }

  // Estas funciones extraen las entidades de la base de datos y
  // las asignan a sus arrays correspondientes
  getcodigos(): void {
    let resCodigos: ICodigoDESDE[];
    /* let promise= new Promise((solve, eject) =>{
      solve('test');
    }); */
    this.codigoDESDEService.query().subscribe((res: HttpResponse<ICodigoDESDE[]>) => {
      this.codigoDESDES = res.body ?? [];
      resCodigos = res.body ?? [];
      console.log(resCodigos);
      /* promise= new Promise((resolve, reject) =>{
        console.log(resCodigos);
        if(resCodigos.length !== 0){
          this.codigoDESDES= resCodigos;
          resolve('done');
        }else{
          reject('reject'); 
        }
      }) */
    });
    //return promise;
  }

  getsecciones(): void {
    let resSecciones: ISeccion[];
    this.seccionService.query().subscribe((res: HttpResponse<ISeccion[]>) => {
      resSecciones = res.body ?? [];
      console.log(resSecciones);
      this.seccions = resSecciones;
    });
  }

  getclasificadores(): void {
    let resClasificadores: IClasificador[];
    this.clasificadorService.query().subscribe((res: HttpResponse<IClasificador[]>) => {
      resClasificadores = res.body ?? [];
      console.log(resClasificadores);
      this.clasificadores = resClasificadores;
    });
  }

  getidentificadores(): void {
    let resIdentificadores: IIdentificador[];
    this.identificadorService.query().subscribe((res: HttpResponse<IIdentificador[]>) => {
      resIdentificadores = res.body ?? [];
      console.log(resIdentificadores);
      this.identificadores = resIdentificadores;
    });
  }

  //Manda la interfaz con todos los datos relevantes al home-element
  sendmsg(elemento: any, homeCodigoDESDE: boolean): void {
    const msg = new HomeListElement(elemento.nombre, elemento.descripcion, elemento.codigo, elemento.ejemplos, homeCodigoDESDE);

    this.msgToHome.emit(msg);
    console.log(msg);
  }
}
