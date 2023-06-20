import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { studentType } from '../models/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  public id:string;
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
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    if (this.id){
      this.getStudent(this.id)
    }

  }
  public getStudent(id:string){
    this.serverHttp.getStudent(id).subscribe((data)=>{
      for (const controlName in this.studentForm.controls){
        if(controlName){
          this.studentForm.controls[controlName].setValue(data[controlName])
        }
      }

    })
  }
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
    if(!this.id){
      this.serverHttp.addStudent(this.createNewData()).subscribe((data) => {
        this.router.navigate(['students']);
      });
    }
    else{
      this.serverHttp.editStudent(this.createNewData(),this.id).subscribe((data) => {
        this.router.navigate(['students']);
      });
    }
  }
}
