import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  taskForm!: FormGroup;
  taskId!: string;

  constructor(private taskService: TaskService, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    })
  }


  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.taskService.getTaskById(this.taskId).subscribe(
      task => {
        if (task) {
          this.taskForm.setValue({
            title: task.title,
            description: task.description,
            status: task.status
          });
        } else {
          this.toastr.error('Task not found.','Error');
          this.router.navigate(['/']);
        }
      },
      error => this.toastr.error('Failed to load task.','Error')
    );
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe(
        () => {
          this.toastr.success('Task updated successfully!','Success');
          this.router.navigate(['/']);
        },
        error => this.toastr.error('Failed to update task.','Error')
      );
    }
    else {
      this.toastr.error('Please fill in all required fields.', 'Error');
    }
  }
}
