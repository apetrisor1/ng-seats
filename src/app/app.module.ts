import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AreaComponent } from './area/area.component'
import { CpanelComponent } from './cpanel/cpanel.component'

import { DraggableDirective } from './shared/directives/draggable.directive'
import { DroppableDirective } from './shared/directives/droppable.directive'

import { GroupingService } from './shared/services/grouping.service'
import { SVGService } from './shared/services/svgservice.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    CpanelComponent,
    DraggableDirective,
    DroppableDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GroupingService, SVGService],
  bootstrap: [AppComponent]
})
export class AppModule { }