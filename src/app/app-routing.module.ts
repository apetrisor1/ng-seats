import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AreaComponent } from './area/area.component'
import { CpanelComponent } from './cpanel/cpanel.component'

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'area', component: AreaComponent },
  { path: 'cpanel', component: CpanelComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// TODO ROUTES
