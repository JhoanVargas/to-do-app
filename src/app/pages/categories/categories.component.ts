import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category';
import { Category } from '../../models/category.model';
import { ModalController } from '@ionic/angular';
import { CategoryFormComponent } from 'src/app/forms/category-form/category-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CategoriesComponent implements OnInit {
  newFeatureEnabled = false;
  categorys: Category[] = [];
  paginatedCategorys: Category[] = [];
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20, 50];
  showForm = false;
  selectOptionsPage = {
    header: 'Seleccione # de items',
    cssClass: 'custom-select-alert',
  };

  constructor(
    private categoryService: CategoryService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadCategorys();
  }

  get totalPages(): number {
    return Math.ceil(this.categorys.length / this.pageSize) || 1;
  }

  loadCategorys() {
    this.categorys = this.categoryService.getAll().reverse();
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedCategorys = this.categorys.slice(start, end);
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id!);
    this.loadCategorys();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addCategory(category: Category) {
    const newTask: Category = {
      id: Date.now().toString(),
      name: category.name,
    };

    this.categoryService.add(newTask);
    this.showForm = false;
    this.loadCategorys();
  }

  editCategory(category: Category) {
    this.categoryService.update(category);
    this.showForm = false;
    this.loadCategorys();
  }

  async openCategoryModal(category?: Category) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let isEdit = category?.id ? true : false;
    const modal = await this.modalCtrl.create({
      component: CategoryFormComponent,
      componentProps: {
        isEdit: isEdit,
        categoryData: category ? category : {},
      },
      backdropDismiss: false,
      ...(isMobile
        ? {
            breakpoints: [0, 0.5, 0.8],
            initialBreakpoint: 0.8,
            handle: true,
          }
        : {
            cssClass: 'desktop-modal',
          }),
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      if (category) {
        this.editCategory(data);
      } else {
        this.addCategory(data);
      }
    }
  }
}
