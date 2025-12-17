import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {

frm: FormGroup;

toastr: ToastrService

constructor(private fb: FormBuilder) {

  this.frm = this.fb.group(
    {
      'nome':['',[Validators.required]],
      'endereco':['',[Validators.required, Validators.maxLength(30)]],
      'email':['',[Validators.required, Validators.email]],
    }
  )

  this.toastr = inject(ToastrService)

}

salvar(){
  
  console.log('Estado do Formulário',this.frm.status)

  this.toastr.success("Está bem!")

}


}
