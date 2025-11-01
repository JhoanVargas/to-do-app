import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getAll(): Task[] {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  }

  private saveAll(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  add(task: Task): void {
    const tasks = this.getAll();
    tasks.push(task);
    this.saveAll(tasks);
  }

  update(task: Task): void {
    const tasks = this.getAll().map((t) => (t.id === task.id ? task : t));
    this.saveAll(tasks);
  }

  delete(id: string): void {
    const tasks = this.getAll().filter((t) => t.id !== id);
    this.saveAll(tasks);
  }

  getByCategory(categoryId: string): Task[] {
    return this.getAll().filter((t) => t.category.id === categoryId);
  }
}
