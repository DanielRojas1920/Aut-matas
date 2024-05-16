import { AfterViewInit, Component} from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  constructor() {}

  ngAfterViewInit(): void {
    
  }

  str: string='';
  pila: string[] = ['Z']
  index: number= 0;
  alfabeto: string[] = ['a','b','c']
  alfabetoPila: string[] = ['a','b', 'Z']
  resultado: string = '';
  velocidad: number= 1000;
  estadoActual: number=1;
  isBottonOn=true;

  isModalOpen: boolean = false;

  changeIsModalOpen(bool: boolean){
    this.isModalOpen = bool;
    this.index=0;
    this.resultado = '';
  }

  obtainLetters(str: string){
    return str.split('');
  }

  initValidation(){
    this.pila = ['Z'];
    this.index = 0;
    this.resultado = 'Procesando...';
    let gridPila;
    if (document.getElementById('pila-grid')) gridPila = document.getElementById('pila-grid');
    while(gridPila?.firstChild){
      gridPila.removeChild(gridPila.firstChild);
    }
    const row = document.createElement('ion-row');
    const col= document.createElement('ion-col');
    col.textContent = 'Z';
    col.setAttribute('size', '4');
    col.setAttribute('offset', '4');
    col.style.backgroundColor = '#0054e9';
    col.style.color = '#fff';
    col.style.textAlign= 'center';
    col.style.border= 'solid 1px #fff';
    row.appendChild(col);
    gridPila?.appendChild(row);
    this.isBottonOn = false;
    return this.q1();
  }

  async q1(): Promise<any> {
      if (this.alfabeto.slice(0,2).includes(this.str[this.index])){
        const addPila= this.str[this.index]
        this.pila.unshift(addPila)
        await new Promise<void> (resolve=> {
          setTimeout(()=>{
            const div = document.getElementById('pila-grid');
            const newRow = document.createElement('ion-row');
            const newCol = document.createElement('ion-col');
            newCol.setAttribute('size', '4');
            newCol.setAttribute('offset', '4');
            newCol.style.backgroundColor = '#0054e9';
            newCol.style.color = '#fff';
            newCol.style.textAlign= 'center';
            newCol.style.border= 'solid 1px #fff';
            newCol.textContent=  addPila;
            newRow.appendChild(newCol);
            div?.insertBefore(newRow, div.firstChild);
            resolve();
          }, this.velocidad);
        });
        await new Promise<void> (resolve => {
          setTimeout(()=>{
            this.index++;
            resolve();
          }, this.velocidad);
        });
        return this.q1();
      }
      else if(this.alfabeto[2].includes(this.str[this.index])){
        await new Promise<void> (resolve => {
          setTimeout(()=>{
            this.index++;
            resolve();
          }, this.velocidad);
        });
        return this.q2();
      }
      this.isBottonOn = true;
      this.resultado= 'Cadena inválida';
  }

  async q2(): Promise<any>{
    if(this.str[this.index] === this.pila[0]){
      await new Promise<void> (resolve => {
        setTimeout(()=>{
          const grid = document.getElementById('pila-grid');
          if (grid?.firstChild) grid?.removeChild(grid.firstChild);
          resolve();
        }, this.velocidad)
      });
      await new Promise<void> (resolve => {
        setTimeout(()=>{
          this.index++;
          resolve();
        }, this.velocidad);
      });
      this.pila.shift();
      return this.q2();
    }
    else if(this.alfabeto.slice(0,2).includes(this.str[this.index])
    && this.alfabetoPila.slice(0,2).includes(this.pila[0])){
        await new Promise<void> (resolve => {
          setTimeout(()=>{
            const grid = document.getElementById('pila-grid');
            if (grid?.firstChild) grid?.removeChild(grid.firstChild);
            resolve();
          }, this.velocidad)
        });
        await new Promise<void> (resolve => {
          setTimeout(()=>{
            this.index++;
            resolve();
          }, this.velocidad);
        });
      this.pila.shift();
      return this.q3();
    }
    else if (this.alfabeto.slice(0,2).includes(this.str[this.index])){
      await new Promise<void> (resolve => {
        setTimeout(()=>{
          this.index++;
          resolve();
        }, this.velocidad);
      });
      return this.q3();
    }
    else if(this.str[this.index] === undefined
      && this.alfabetoPila.slice(0,2).includes(this.pila[0])){
        await new Promise<void> (resolve => {
          setTimeout(()=>{
            const grid = document.getElementById('pila-grid');
            const row = grid?.firstChild;
            if (row?.firstChild) row?.removeChild(row.firstChild);
            const col = document.createElement('ion-col');
            col.setAttribute('size', '4');
            col.setAttribute('offset', '4');
            col.style.backgroundColor = '#0054e9';
            col.style.color = '#fff';
            col.style.textAlign= 'center';
            col.style.border= 'solid 1px #fff';
            col.textContent = 'Z';
            row?.appendChild(col);
            resolve();
          }, this.velocidad)
        });
        this.pila[0] = 'Z';
        return this.q4();
    }
    this.resultado= 'Cadena inválida';
    this.isBottonOn = true;
  }

  async q3(): Promise<any> {
    if (this.alfabeto.slice(0,2).includes(this.str[this.index])
      && this.alfabetoPila.slice(0,2).includes(this.pila[0])
    ){
      await new Promise<void> (resolve => {
        setTimeout(()=>{
          const grid = document.getElementById('pila-grid');
          if (grid?.firstChild) grid?.removeChild(grid.firstChild);
          resolve();
        }, this.velocidad)
      });
      await new Promise<void> (resolve => {
        setTimeout(()=>{
          this.index++;
          resolve();
        }, this.velocidad);
      });
      this.pila.shift();
      return this.q3();
    }
    else if (this.str[this.index] === undefined
      && this.alfabetoPila.slice(0,2).includes(this.pila[0])
    ){
        this.pila[0] = 'Z';
        await new Promise<void> (resolve => {
          setTimeout(()=>{
            const grid = document.getElementById('pila-grid');
            const row = grid?.firstChild;
            if (row?.firstChild) row?.removeChild(row.firstChild);
            const col = document.createElement('ion-col');
            col.setAttribute('size', '4');
            col.setAttribute('offset', '4');
            col.style.backgroundColor = '#0054e9';
            col.style.color = '#fff';
            col.style.textAlign= 'center';
            col.style.border= 'solid 1px #fff';
            col.textContent = 'Z';
            row?.appendChild(col);
            resolve();
          }, this.velocidad)
        });
        return this.q4();
      }
    else if (this.alfabeto.slice(0,2).includes(this.str[this.index])){
      await new Promise<void> (resolve => {
        setTimeout(()=>{
          this.index++;
          resolve();
        }, this.velocidad);
      });
      return this.q3();
    }
    else if(this.str[this.index] === undefined){
      await new Promise<void> (resolve => {
        setTimeout(()=>{
          resolve();
        }, this.velocidad);
      });
      return this.q4();
    }
    this.resultado= 'Cadena inválida';
    this.isBottonOn = true;
  }

  q4(): any{
    this.resultado= 'La cadena es válida'
    this.isBottonOn = true;
  }




}
