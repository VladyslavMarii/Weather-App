import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { WeatherData } from '../models/weather.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit{
  @Input() data: WeatherData;
  constructor(@Inject(MAT_DIALOG_DATA) public weatherData: WeatherData) {
    this.data = weatherData;
  }


  ngOnInit(): void {
  }
}
