import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ConfigurationComponent } from './configuration/configuration.component'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'configuration/:id', component: ConfigurationComponent },
  { path: '**', redirectTo: 'login' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// TODO ROUTES
