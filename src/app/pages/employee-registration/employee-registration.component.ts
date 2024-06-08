import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.css',
})
export class EmployeeRegistrationComponent implements OnInit {
  departments: any[] = [];
  employee: any[] = [];
  isListView: boolean = true;
  isEditing: boolean = false;

  employeeObject = {
    id: '',
    firstName: '',
    lastName: '',
    departmentId: '',
    gender: '',
    email: '',
    phoneNumber: '',
  };

  editButton(id: string) {
    this.isListView = !this.isListView;
    this.isEditing = true;
    this.userService.getUserById(id).subscribe((res: any) => {
      this.employeeObject = res;
    });
  }

  toggleButton() {
    this.isListView = !this.isListView;
    this.isEditing = false;
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    //this.LoadEmployees();
    this.getUsers();
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe((res: any) => {
        this.employeeObject = res;
      });
    }
  }

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
      debugger;
      this.employee = res; // con archivos .json no usar res.data;
    });
  }
  onSubmit1() {
    console.log(this.employeeObject.email);
  }

  onEdit() {
    this.userService.updateUser(this.employeeObject).subscribe(
      (res: any) => {
        console.log('Update success');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUser(id: string) {
    this.userService.deleteById(id).subscribe(
      (res: any) => {
        console.log('deleted');
        this.getUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
