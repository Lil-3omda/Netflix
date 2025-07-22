import { Component, OnInit, NgModule } from '@angular/core';
import { IProfile, ProfilesService } from '../profiels';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-choose-profile',
  imports: [FormsModule],
  templateUrl: './choose-profile.html',
  styleUrl: './choose-profile.css'
})
export class ChooseProfile implements OnInit {
  profiles:IProfile[] = [];
  userId:number = Number(localStorage.getItem('userId')) || 0;
  newprofileName: string = '';
  error: string = '';

  constructor(private profilesService: ProfilesService, private router:Router ) {}
  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles():void{
    this.profilesService.getProfilesByUserId(this.userId).subscribe({
      next:(res) =>{
        this.profiles = res;
      },
      error: (err) => {
        console.error('Error loading profiles:', err);
        this.error = 'Failed to load profiles. Please try again later.';
        this.profiles = [];
      }
    });
  }

  selectProfile(profileId: number): void {
    localStorage.setItem('profileId',JSON.stringify(profileId));
    this.router.navigate(['/home']);
  };

  createProfile():void {
    if (this.newprofileName.trim() === '') {
      this.error = 'Profile name cannot be empty.';
      return;
    }

    const newProfile = {
      name: this.newprofileName,
      userId: this.userId
    };

    this.profilesService.createProfile(newProfile).subscribe({
      next: (res) => {
        this.profiles.push(res);
        this.newprofileName = '';
        this.error = '';
        this.loadProfiles();
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        this.error = 'Failed to create profile. Please try again later.';
      }
    });
  }
  
}


  
