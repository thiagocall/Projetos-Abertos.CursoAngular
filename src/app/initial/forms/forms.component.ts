import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray, AbstractControl, ValidationErrors} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SendDataService } from './send-data.service';
import { debounceTime, filter, Observable, startWith } from 'rxjs';

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

// $nomeChange: Observable<any>;

constructor() {

     this.frm = this.fb.group(
    {
      'nome':['',[Validators.minLength(3),Validators.required]],
      'enderecos': this.fb.array([ this.criarEnderecoControl()]),
      'email':['',[Validators.required, Validators.email, this.emailRegexValidator()]],
    }
  )

     this.frm.controls['nome'].valueChanges
    .pipe(
      startWith(''),
      debounceTime(700)
    )
    .subscribe(
      res=>{
        console.log(res)
      }
    )
}

salvar(){
  
  if(this.frm.invalid)
  {
    console.log(this.frm.controls);
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

  get enderecos(): FormArray {
    return this.frm.get('enderecos') as FormArray;
  }

  criarEnderecoControl(): FormControl {
    return this.fb.control('', [Validators.required, Validators.maxLength(30)]);
  }

  adicionarEndereco(): void {
    this.enderecos.push(this.criarEnderecoControl());
  }

  removerTelefone(index: any) {
    this.enderecos.removeAt(index);
    
  }


  emailRegexValidator() {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null; // deixa vazio passar (use required separado)

    const isValid = regex.test(value);

    return isValid ? null : { emailInvalido: true };
  };
}

enviarEndereco() {

}


}
