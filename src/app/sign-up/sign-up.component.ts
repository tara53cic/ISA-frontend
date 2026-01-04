import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService} from '../service';
import { UserService } from '../service/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  title = 'Sign up';
  form!: FormGroup;

  submitted = false;

  notification!: DisplayMessage;

  returnUrl!: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: any) => {
        this.notification = params as DisplayMessage;
      });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      confirmPassword: ['', Validators.required],
      firstname: [''],
      lastname: [''],
      email: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        country: ['']
      })
    }, { validators: this.passwordMatchValidator });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {

    this.notification;
    this.submitted = true;

    if (this.form.hasError('mismatch')) {
      this.submitted = false;
      this.notification = { msgType: 'error', msgBody: 'Passwords do not match' };
      return;
    }

    const signupData: any = Object.assign({}, this.form.value);
    delete signupData.confirmPassword;

    this.authService.signup(signupData)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/check-email']);
      },
        error => {
          this.submitted = false;
          console.log('Sign up error');
          this.notification = { msgType: 'error', msgBody: error['error'].message };
        });

  }

    private passwordMatchValidator = (group: FormGroup) => {
      const pw = group.get('password')?.value;
      const cpw = group.get('confirmPassword')?.value;
      return pw === cpw ? null : { mismatch: true };
    }

    passwordMismatch(): boolean {
      return this.form && this.form.hasError('mismatch');
    }


}
