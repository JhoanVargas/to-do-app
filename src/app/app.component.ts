import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}
  ngOnInit() {
    this.initializeLocalStorage();
  }

  private initializeLocalStorage(): void {
    const tasks = localStorage.getItem('tasks');
    const categories = localStorage.getItem('categories');

    if (!tasks) {
      localStorage.setItem('tasks', JSON.stringify([]));
    }

    if (!categories) {
      localStorage.setItem('categories', JSON.stringify([]));
    }
  }
}
