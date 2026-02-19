import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray, AbstractControl, ValidationErrors} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SendDataService } from './send-data.service';
import { debounceTime, filter, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {

frm: FormGroup;
fb = inject(FormBuilder)
dataService = inject(SendDataService)
toastr = inject(ToastrService)

constructor() {

     this.frm = this.fb.group(
    {
      'nome':['',[Validators.required]],
      'enderecos':this.fb.array([ this.criarEnderecoControl()]),
      'email':['',[Validators.required, this.emailRegexValidator()]],
    }
  )

  this.frm.controls['nome'].valueChanges
    .pipe(
      startWith(''),
      debounceTime(700)
    )
    .subscribe(
      res => {console.log(res)}
    )

}

  criarEnderecoControl(): FormControl {
    return this.fb.control('', [Validators.required, Validators.maxLength(30)]);
  }

  get enderecos(): FormArray {
    return this.frm.get('enderecos') as FormArray;
  }

   adicionarEndereco(): void {
    this.enderecos.push(this.criarEnderecoControl());
  }

    removerEndereco(index: any) {
    this.enderecos.removeAt(index);
    
  }



salvar(){
  console.log('Estado do Formulário',this.frm.controls['email'].errors)

  if(this.frm.invalid){
    this.frm.markAllAsTouched()
    return;
  }

  console.log('Estado do Formulário', this.frm.status)

  this.dataService.send(this.frm.getRawValue())
      .subscribe(
        (res) => console.log(res)

      )
  this.toastr.success("Está bem!")
}

emailRegexValidator(){
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value

    if(!value) return null;

    const isvalid = regex.test(value);

    return isvalid? null : {emailInvalido: true}

  }
}

}
