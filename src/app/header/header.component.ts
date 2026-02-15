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

  constructor(public userService: UserService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    if (!this.userService.currentUser) {
      this.userService.getMyInfo().subscribe(() => {}, () => {});
    }
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  userName() {
    const user = this.userService.currentUser;
    if (!user) { return ''; }
    if (user.username) { return user.username; }
    return ((user.firstName || '') + ' ' + (user.lastName || '')).trim();
  }
  userInitials(): string {
    const u: any = this.userService.currentUser;
    if (!u) { return ''; }
    const fn = u.firstname || u.firstName || '';
    const ln = u.lastname || u.lastName || '';
    const initials = ((fn.charAt(0) || '') + (ln.charAt(0) || '')).toUpperCase();
    return initials || (u.username ? u.username.charAt(0).toUpperCase() : '');
  }
  logout() {
    this.authService.logout();
  }

  openCreateVideo() {
    this.dialog.open(VideoUploadComponent, { width: '860px' });
  }

}
