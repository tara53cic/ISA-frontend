import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video.model';
import { MockVideoService } from '../service/mock.video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 

  constructor(
    private videoService: MockVideoService
  ) {
  }

  recommendedVideos: Video[] = [];
  recentVideos: Video[] = [];

  ngOnInit() {
    const videos = this.videoService.getVideos();
    this.recommendedVideos = videos.slice(0, 5);
    this.recentVideos = [...videos].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }

}
