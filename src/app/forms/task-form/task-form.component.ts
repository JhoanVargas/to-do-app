import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Task } from 'src/app/models/task.model';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class TaskFormComponent {
  @Input() isEdit: boolean = false;
  @Input() taskData: Task = {
    id: '',
    title: '',
    description: '',
    category: { id: '', name: '' },
    completed: false,
  };

  @Input() categorys: any[] = [];

  selectOptions = {
    header: 'Selecciona una categoría',
    cssClass: 'custom-select-alert',
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.taskData.id = this.generateId();
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveTask() {
    this.modalCtrl.dismiss(this.taskData);
  }

  generateId(): string {
    return (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
    ).substring(0, 10);
  }
  compareFn(item: any, selected: any) {
    return item.id === selected.id;
  }
}
