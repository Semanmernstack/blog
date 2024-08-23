import { Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { EditComponent } from './edit/edit.component';
import { DetailsPage } from './home/details/details.page';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePage,
    pathMatch: "full"
  },
  {
    path: 'details-page/:id', 
    component: DetailsPage
  },
  { path: 'edit/:id', component: EditComponent },
  {
    path: 'add-form-page',
    component: AddFormComponent
  }
];
