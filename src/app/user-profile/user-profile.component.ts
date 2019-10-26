import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IUser } from '../interfaces/iuser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profile: IUser = {};
  constructor(
    private UserProfileService: UserProfileService,
    private AuthService:AuthService,
    private router: Router,
    private formbuilder: FormBuilder,
    ) {}

  ngOnInit() {
    this.profile = this.formbuilder.group({
      favoriteMovie: "Anchorman",
      firstName: "Jim",
      lastName: "Sanders",
      email: "jim@test.com"
    });
  }

  post() {
    //const service: UserProfileService
    this.UserProfileService.post(this.profile)
    .subscribe(data=> this.profile = data);
  }

  onSubmit(user) {
    // Process checkout data here
    console.warn("Submitted", user);
    this.AuthService.register(user).subscribe(user => {
      console.log(user);
      if (user) this.router.navigateByUrl("/");
    });
  }
}
