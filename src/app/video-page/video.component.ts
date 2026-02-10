import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../models/video.model';
import { VideoService } from '../service/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  video?: Video;
  liked = false;
  disliked = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.videoService.getVideoById(id).subscribe(v => this.video = v);
    }
  }

  toggleLike() {
    this.liked = true;
    this.disliked = false;
  }

  toggleDislike() {
    this.disliked = true;
    this.liked = false;
  }
}
