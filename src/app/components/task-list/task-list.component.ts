import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { TaskStateService } from '../../services/task-state.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule], // 🔥 Necesare pentru *ngFor
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService,private taskState: TaskStateService  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Eroare la încărcare task-uri:', err)
    });
  }
  deleteTask(id: number | undefined) {
    if (!id) return;

    if (confirm('Sigur vrei să ștergi acest task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Eroare la ștergere:', err)
      });
    }
  }

  editTask(task: Task) {
    this.taskState.setTask(task);
  }
  completedVisible = false;

  get incompleteTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }

  toggleCompleted() {
    this.completedVisible = !this.completedVisible;
  }


}
