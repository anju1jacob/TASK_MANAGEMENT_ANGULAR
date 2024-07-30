import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {

  taskForm!: FormGroup

  constructor(private taskService: TaskService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe(
        () => {
          this.toastr.success('Task created successfully!','Success');
          this.router.navigate(['/']);
        },
        error => this.toastr.error('Failed to create task.','Error')
      );
    }
    else {
      this.toastr.error('Please fill in all required fields.', 'Error');
    }
  }

}


