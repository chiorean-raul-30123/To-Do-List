import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskStateService } from '../../services/task-state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    dueDate: '',
    completed: false
  };

  isEditing = false;

  constructor(
    private taskService: TaskService,
    private taskState: TaskStateService
  ) {}

  ngOnInit(): void {
    this.taskState.currentTask$.subscribe((t) => {
      if (t) {
        this.task = { ...t };
        this.isEditing = true;
      }
    });
  }

  onSubmit() {
    if (this.isEditing && this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe({
        next: () => {
          console.log('Task actualizat');
          this.resetForm();
        },
        error: (err) => console.error('Eroare la actualizare:', err)
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: () => {
          console.log('Task creat');
          this.resetForm();
        },
        error: (err) => console.error('Eroare la creare:', err)
      });
    }
  }

  resetForm() {
    this.task = { title: '', description: '', dueDate: '', completed: false };
    this.isEditing = false;
    this.taskState.clearTask();
  }
}
