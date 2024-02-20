import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { WeatherData } from '../models/weather.model';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent {
  @Input() selectedList?: WeatherData[] = [];
  constructor(private dialogRef : MatDialog){
  }
  
  openDialog(item:any){
    this.dialogRef.open(PopUpComponent,{
      data : {
        data : item
      }
    });
  }
}
