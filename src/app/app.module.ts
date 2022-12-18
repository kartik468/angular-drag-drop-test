import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomDraggableDirective } from './directives/custom-draggable.directive';
import { CustomDroppableDirective } from './directives/custom-droppable.directive';

@NgModule({
  declarations: [
    AppComponent,
    CustomDraggableDirective,
    CustomDroppableDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
