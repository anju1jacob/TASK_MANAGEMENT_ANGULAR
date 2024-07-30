import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit{

  constructor(private router:Router, private taskService:TaskService,private toastr: ToastrService,){}

  tasks: any[] = [];

  ngOnInit(): void {
    this.loadTasks()
  }

  navigateToCreate() {
    this.router.navigate(['/create-task']);
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      data => this.tasks = data,
      error => this.toastr.error('Failed to load tasks.','Error')
    );
  }

  navigateToEdit(id: string) {
    this.router.navigate([`/edit-task/${id}`]);
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.toastr.success('Task deleted successfully!', 'Success');
          this.loadTasks();
        },
        error => this.toastr.error('Failed to delete task.','Error')
      );
    }
  }


}
