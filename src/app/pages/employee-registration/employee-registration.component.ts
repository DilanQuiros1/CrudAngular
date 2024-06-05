import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.css',
})
export class EmployeeRegistrationComponent implements OnInit {
  departments: any[] = [];

  isListView: boolean = true;

  constructor(private http: HttpClient) {
    this.LoadDepartments();
  }
  ngOnInit(): void {}

  LoadDepartments() {
    this.http.get('assets/departments.json').subscribe((res: any) => {
      debugger;
      this.departments = res.data;
    });
  }
}
