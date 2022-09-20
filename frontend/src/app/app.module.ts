import { Store, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPageComponent } from './feature/search/page/search-page/search-page.component';
import { HistoryPageComponent } from './feature/history/page/history-page/history-page.component';
import { NavComponent } from './shared/nav/nav.component';
import { AngularMaterialModule } from './angular-material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './store/search/search-effects';
import { searchReducer } from './store/search/search-reducer';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    HistoryPageComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      search: searchReducer,
    }),
    EffectsModule.forRoot([SearchEffects]),
  ],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
