import { Component, OnInit } from '@angular/core';
import { IProfile, ProfilesService } from '../profiels';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './choose-profile.html',
  styleUrls: ['./choose-profile.css']  // use styleUrls, not styleUrl
})
export class ChooseProfile implements OnInit {
  profiles: IProfile[] = [];
  user: any = null;
  userId: string = '';
  newprofileName: string = '';
  error: string = '';

  constructor(private profilesService: ProfilesService, private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('netflix_user');
    if (stored) {
      try {
        this.user = JSON.parse(stored);
        this.userId = String(this.user.id ?? this.user.userId ?? '');
      } catch (e) {
        console.error('Invalid user JSON:', e);
        this.userId = '';
      }
    }

    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profilesService.getProfilesByUserId(this.userId).subscribe({
      next: (res) => {
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
    localStorage.setItem('profileId', JSON.stringify(profileId));
    this.router.navigate(['/Home']);
  }

  createProfile(): void {
    if (this.newprofileName.trim() === '') {
      this.error = 'Profile name cannot be empty.';
      return;
    }

    const newProfile = {
      name: this.newprofileName,
      userId: this.userId   // now a string
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
