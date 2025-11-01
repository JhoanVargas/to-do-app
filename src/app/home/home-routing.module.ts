import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { TasksComponent } from '../pages/tasks/tasks.component';
import { CategoriesComponent } from '../pages/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'tasks', component: TasksComponent },
      { path: 'categories', component: CategoriesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
