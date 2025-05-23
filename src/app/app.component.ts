import { Component } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component'; // importă componenta
import { TaskListComponent} from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent,TaskListComponent], // <--- ADĂUGĂ AICI!
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
