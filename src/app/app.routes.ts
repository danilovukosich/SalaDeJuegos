import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: "", redirectTo:"home", pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'about', component:AboutComponent,},
    {path:'login', component:LoginComponent},
    {path: "**", redirectTo:"home", pathMatch:'full'},
];
