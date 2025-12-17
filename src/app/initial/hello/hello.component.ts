import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HelloService } from './hello.service';

@Component({
  selector: 'app-hello',
  imports: [CommonModule, RouterModule],
  providers: [HelloService],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
export class HelloComponent implements OnInit{

  /**
   *
   */
  constructor(private service: HelloService) {
  
    
  }
  ngOnInit(): void {

    this.service.getPoke()
      .subscribe(
        res => {
          this.pokelist = res.results;
          console.log(res)
        }
      )
    
  }

  pokelist: any;

  Acao(){
    // alert("Acao executada!")
  }

  @Input() items = [];

  @Output() Confirmar = new EventEmitter<any>();

  contador = signal(0);
  
    AddContador(){
      // this.contador += 1;
      this.contador.update(x => x + 1);
    }


}
