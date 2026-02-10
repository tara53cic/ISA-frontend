import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from '../models/video.model';
import { VideoService } from '../service/video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

 

  constructor(private videoService: VideoService) {}

  recommendedVideos: Video[] = [];
  recentVideos: Video[] = [];
  private sub: Subscription | null = null;

  loadVideos() {
    this.videoService.getVideos().subscribe(videos => {
      this.recommendedVideos = videos.slice(0, 5);
      this.recentVideos = [...videos].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    });
  }

  ngOnInit() {
    this.loadVideos();
    this.sub = this.videoService.videosUpdated.subscribe(() => this.loadVideos());
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}
