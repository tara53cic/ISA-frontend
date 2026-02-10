import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoService } from '../service/video.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent {
  form: FormGroup;
  thumbnailPreview: string | ArrayBuffer | null = '';
  thumbnailFile: File | null = null;
  videoFile: File | null = null;
  uploading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VideoUploadComponent>,
    private videoService: VideoService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      tags: [''],
      location: ['']
    });
  }

  onThumbnailChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) { return; }
    this.thumbnailFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => this.thumbnailPreview = reader.result;
    reader.readAsDataURL(this.thumbnailFile);
  }

  onVideoChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) { return; }
    this.videoFile = input.files[0];
  }

  submit() {
    if (this.uploading) { return; }
    const rawTags = (this.form.value.tags || '').toString();
    const tags = rawTags.split(',').map((t: string) => t.trim()).filter((t: string) => !!t);
    const payload = {
      title: this.form.value.title,
      description: this.form.value.description,
      tags,
      location: this.form.value.location
    };

    const fd = new FormData();
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    fd.append('data', blob, 'data.json');
    if (this.thumbnailFile) { fd.append('thumbnail', this.thumbnailFile, this.thumbnailFile.name); }
    if (this.videoFile) { fd.append('video', this.videoFile, this.videoFile.name); }

    this.uploading = true;
    this.videoService.uploadVideo(fd).subscribe({
      next: (res) => {
        this.snack.open('Video uploaded', 'Close', { duration: 3000 });
        this.uploading = false;
        this.dialogRef.close({ created: true, response: res });
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Upload failed', 'Close', { duration: 4000 });
        this.uploading = false;
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
