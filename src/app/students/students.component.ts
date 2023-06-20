import { ServerHttpService } from './../Services/server-http.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  public students = [];
  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }
  public getStudent() {
    this.serverHttp.getStudents().subscribe((data) => {
      this.students = data;
    });
  }
  public addStudent() {
    this.router.navigate(['student-form']);
  }

  public deleteStudent(id: string) {
    this.serverHttp.deleteStudent(id).subscribe((data) => {
      this.getStudent();
    });
  }
}
