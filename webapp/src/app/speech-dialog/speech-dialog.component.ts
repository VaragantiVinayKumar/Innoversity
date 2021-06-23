import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VoiceRecognitionService } from '../services/voice-recognition.service';

@Component({
  selector: 'app-speech-dialog',
  templateUrl: './speech-dialog.component.html',
  styleUrls: ['./speech-dialog.component.css']
})
export class SpeechDialogComponent implements OnInit {

  text: string;
  voiceText: string;

  constructor(public service : VoiceRecognitionService, public voiceSearchModal: MatDialogRef<SpeechDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      voiceSearchModal.disableClose = true;
    this.service.init()
   }

   ngOnInit(): void {
    this.startService();
    console.log("data:", this.data);
  }

  startService(){
    this.service.start();
    this.service.text='';
  }

  stopService(){
    this.service.stop();
    this.voiceText = this.service.text.trim();
    this.data.voiceText = this.voiceText;
    console.log("searched when stopped:", this.voiceText);
    this.voiceSearchModal.close(this.data);
  }

  clearText() {
    this.service.text = '';
  }

  cancel() {
    this.service.stop();
    this.service.text = '';
    this.data.voiceText = this.voiceText;
    console.log("searched when stopped:", this.voiceText);
    this.voiceSearchModal.close(this.data);
  }

}
