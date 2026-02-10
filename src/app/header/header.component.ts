import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { VideoUploadComponent } from '../video-upload/video-upload.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  userName() {
    const user = this.userService.currentUser;
    if (!user) { return ''; }
    return (user.firstName || '') + ' ' + (user.lastName || '');
  }
  logout() {
    this.authService.logout();
  }

  openCreateVideo() {
    this.dialog.open(VideoUploadComponent, { width: '640px' });
  }

}
