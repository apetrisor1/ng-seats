import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ConfigurationComponent } from './configuration/configuration.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// TODO ROUTES
