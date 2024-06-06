import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.css',
})
export class EmployeeRegistrationComponent implements OnInit {
  departments: any[] = [];
  employee: any[] = [];
  isListView: boolean = true;

  employeeObject = {
    id: '',
    firstName: '',
    lastName: '',
    departmentId: '',
    gender: '',
    email: '',
    phoneNumber: '',
  };

  constructor(private http: HttpClient, private userService: UserService) {
    this.LoadEmployees();
    this.getUsers();
  }
  ngOnInit(): void {}

  LoadEmployees() {
    this.http.get('assets/getEmployee.json').subscribe((res: any) => {
      this.employee = res.data;
    });
  }

  onSubmit() {
    this.userService.addUser(this.employeeObject).subscribe((res: any) => {
      console.log('Usuario añadido:', res);
      // puedes resetear el formulario aquí si quieres
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.employee = res;
    });
  }
  onSubmit1() {
    console.log(this.employeeObject.email);
  }

  onEdit(item: any) {
    debugger;
    this.employeeObject = item;
    this.isListView = false;
  }
}
