import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-display-sub-admins',
  templateUrl: './display-sub-admins.component.html',
  styleUrls: ['./display-sub-admins.component.scss'],
})
export class DisplaySubAdminsComponent implements OnInit {
  allAdmins: any;
  dataLoading: boolean = true;
  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  alertColor: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Get All Admins
    this.adminService.getAdmins().subscribe({
      next: (res: any) => {
        this.allAdmins = res.data.docs;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Suspend Account
  updateAccountStatus(user: any) {
    let payload = {
      status: user.status == 'active' ? 'inactive' : 'active',
    };

    this.adminService
      .updateStatus(user._id, payload)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          if (res.message === 'User status updated successfully') {
            this.showAlert(res.message, 'success');
            this.ngOnInit();
          }
        },
        error: (e) => {
          console.error(e.message);

          // Show error message
          this.showAlert(e.message, 'error');
        },
      });
  }

  // Show alert
  showAlert(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }
}
