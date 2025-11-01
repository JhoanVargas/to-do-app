import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getAll(): Category[] {
    const data = localStorage.getItem('categories');
    return data ? JSON.parse(data) : [];
  }

  private saveAll(categories: Category[]): void {
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  add(category: Category): void {
    const categories = this.getAll();
    categories.push(category);
    this.saveAll(categories);
  }

  update(category: Category): void {
    const categories = this.getAll().map((c) =>
      c.id === category.id ? category : c
    );
    this.saveAll(categories);
  }

  delete(id: string): void {
    const categories = this.getAll().filter((c) => c.id !== id);
    this.saveAll(categories);
  }
}
