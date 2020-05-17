import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AreaComponent } from './area/area.component'
import { CpanelComponent } from './cpanel/cpanel.component'

import { DraggableDirective, DroppableDirective, MultiSelectDirective, RotateDirective } from './shared/directives'
import { GroupingService, SVGService, MultiSelectService, PositioningService, RotateService } from './shared/services'

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    CpanelComponent,
    DraggableDirective,
    DroppableDirective,
    RotateDirective,
    MultiSelectDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GroupingService,
    MultiSelectService,
    PositioningService,
    RotateService,
    SVGService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
