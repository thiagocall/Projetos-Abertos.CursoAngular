import { Routes } from '@angular/router';
import { HelloComponent } from './initial/hello/hello.component';
import { ListaComponent } from './initial/lista/lista.component';
import { HelloGuardService } from './initial/hello/hello.guard.service';
import { FormsComponent } from './initial/forms/forms.component';

export const routes: Routes = [
    {path:'hello', component: HelloComponent, canActivate: [HelloGuardService], canActivateChild: [HelloGuardService],
        children:[
            {path:'lista', component: ListaComponent}
        ]    
    },
    {path:'lista', component: ListaComponent},
    {path:'forms', component: FormsComponent}
];
