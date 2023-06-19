import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { studentType } from '../models/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  public id = 0;
  public studentForm = new FormGroup({
    code: new FormControl(''),
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  private createNewData() {
    const newStudent = {};
    for (const controlName in this.studentForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.studentForm.controls[controlName].value;
      }
    }
    return newStudent as studentType;
  }
  public saveStudentForm() {
    this.serverHttp.addStudent(this.createNewData()).subscribe((data) => {
      this.router.navigate(['students']);
    });
  }
}
