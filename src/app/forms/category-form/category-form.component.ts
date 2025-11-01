import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CategoryFormComponent {
  @Input() isEdit: boolean = false;
  @Input() categoryData: Category = {
    id: '',
    name: '',
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.categoryData.id = this.generateId();
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveCategory() {
    this.modalCtrl.dismiss(this.categoryData);
  }

  generateId(): string {
    return (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
    ).substring(0, 10);
  }
}
