import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {
  private currentTaskSubject = new BehaviorSubject<Task | null>(null);
  currentTask$ = this.currentTaskSubject.asObservable();

  setTask(task: Task) {
    this.currentTaskSubject.next(task);
  }

  clearTask() {
    this.currentTaskSubject.next(null);
  }
}
