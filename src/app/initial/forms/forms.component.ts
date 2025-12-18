import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray, AbstractControl, ValidationErrors} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SendDataService } from './send-data.service';
<<<<<<< Updated upstream
import { debounceTime, filter, Observable, startWith } from 'rxjs';
=======
import { debounceTime, filter, startWith, tap } from 'rxjs';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
// $nomeChange: Observable<any>;
=======
fb = inject(FormBuilder);
toastr = inject(ToastrService);
sendDataServicce = inject(SendDataService);
>>>>>>> Stashed changes

constructor() {

     this.frm = this.fb.group(
    {
<<<<<<< Updated upstream
      'nome':['',[Validators.minLength(3),Validators.required]],
      'enderecos': this.fb.array([ this.criarEnderecoControl()]),
      'email':['',[Validators.required, Validators.email, this.emailRegexValidator()]],
    }
  )

     this.frm.controls['nome'].valueChanges
=======
      'nome':['',[Validators.required]],
      'enderecos':this.fb.array([ this.criarEnderecoControl()]),
      'email':['',[Validators.required, this.emailRegexValidator()]],
    }
  )

  this.frm.controls['nome'].valueChanges
>>>>>>> Stashed changes
    .pipe(
      startWith(''),
      debounceTime(700)
    )
    .subscribe(
<<<<<<< Updated upstream
      res=>{
        console.log(res)
      }
    )
=======
      res => {console.log(res)}
    )

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  
  if(this.frm.invalid)
  {
    console.log(this.frm.controls);
    this.frm.markAllAsTouched()
    return;
  }
=======
  console.log('Estado do Formulário',this.frm.controls['email'].errors)

  if(this.frm.invalid){
    this.frm.markAllAsTouched()
    return;
  }

  this.sendDataServicce.send(this.frm.getRawValue())
  .subscribe(res=>{
    console.log(res)
  })
>>>>>>> Stashed changes

  console.log('Estado do Formulário', this.frm.status)

  this.dataService.send(this.frm.getRawValue())
      .subscribe(
        (res) => console.log(res)

      )
  this.toastr.success("Está bem!")
}

<<<<<<< Updated upstream
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

=======
emailRegexValidator(){
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value

    if(!value) return null;

    const isvalid = regex.test(value);

    return isvalid? null : {emailInvalido: true}

  }
}
>>>>>>> Stashed changes

}
