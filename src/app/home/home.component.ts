import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public age;
  constructor(private common: CommonService) {
    this.age = common.age;
  }

  ngOnInit(): void {}
  public increaseAge() {
    this.age++;
    this.common.increaseAge();
  }
}
