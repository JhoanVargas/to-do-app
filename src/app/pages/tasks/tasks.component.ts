import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';
import { ModalController } from '@ionic/angular';
import { TaskFormComponent } from 'src/app/forms/task-form/task-form.component';
import { Firebase } from 'src/app/services/firebase';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  newFeatureEnabled = false;
  tasks: Task[] = [];
  paginatedTasks: Task[] = [];
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 20, 50];
  showForm = false;
  categorys: Category[] = [];
  selectCategorys: Category[] = [];
  selectOptions = {
    header: 'Selecciona una categoría',
    cssClass: 'custom-select-alert',
  };
  selectOptionsPage = {
    header: 'Seleccione # de items',
    cssClass: 'custom-select-alert',
  };

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private modalCtrl: ModalController,
    private fb: Firebase
  ) {}

  ngOnInit() {
    this.fb.getFeatures().subscribe((features: any) => {
      this.newFeatureEnabled = features.new_feature_enabled;
    });
    this.loadCategorys();
    this.loadTasks();
  }

  get totalPages(): number {
    return Math.ceil(this.tasks.length / this.pageSize) || 1;
  }

  loadCategorys() {
    this.categorys = this.categoryService.getAll().reverse();
    this.selectCategorys = [
      { id: '', name: 'Todas las categorías' },
      ...this.categorys,
    ];
  }

  loadTasks() {
    this.tasks = this.taskService.getAll().reverse();
    this.updatePagination();
  }

  loadTasksByCategory(categoryId: string) {
    this.tasks = this.taskService.getByCategory(categoryId).reverse();
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTasks = this.tasks.slice(start, end);
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    this.taskService.update(task);
    this.loadTasks();
  }

  deleteTask(task: Task) {
    this.taskService.delete(task.id!);
    this.loadTasks();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addTask(task: Task) {
    const newTask: Task = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description,
      category: task.category,
      completed: false,
    };

    this.taskService.add(newTask);
    this.showForm = false;
    this.loadTasks();
  }

  editTask(task: Task) {
    this.taskService.update(task);
    this.showForm = false;
    this.loadTasks();
  }

  async openTaskModal(task?: Task) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let isEdit = task?.id ? true : false;
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: {
        isEdit: isEdit,
        taskData: task ? task : {},
        categorys: this.categorys,
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
      if (task) {
        this.editTask(data);
      } else {
        this.addTask(data);
      }
    }
  }

  onCategoryChange(category: string) {
    this.currentPage = 1;
    if (category) {
      this.loadTasksByCategory(category);
    } else {
      this.loadTasks();
    }
  }
}
