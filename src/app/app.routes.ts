import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StatsComponent } from './components/stats/stats.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
    {path: "", redirectTo:"home", pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'about', component:AboutComponent,},
    {path:'login', component:LoginComponent},
    {path:'stats', component:StatsComponent},
    {path:'chat', component:ChatComponent},
    {path: "**", redirectTo:"home", pathMatch:'full'},
];
