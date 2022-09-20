import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryPageComponent } from './feature/history/page/history-page/history-page.component';
import { SearchPageComponent } from './feature/search/page/search-page/search-page.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full',
  },
  {
    path: 'history',
    component: HistoryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
