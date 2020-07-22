import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ConfigurationComponent } from './configuration/configuration.component'
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full'},
  { path: 'configuration', component: ConfigurationComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// TODO ROUTES
