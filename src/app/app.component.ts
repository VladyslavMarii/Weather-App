import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';
import {MatDialog} from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
 
  constructor(private weatherService: WeatherService, private dialogRef : MatDialog, private storageService: StorageService){
  }
 
  weatherData?: WeatherData;
  cityName: string = "Kyiv";
  selectedList:WeatherData[] = [];

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName='';
    this.updateList()
  }

  async updateList() {
    this.selectedList = await this.storageService.getAllValues();
  }

  onSubmit(){
      this.getWeatherData(this.cityName);
      this.cityName='';
  }

  
  private getWeatherData(cityName:string){
    this.weatherService.getWeatherData(cityName)
      .subscribe({
        next: (response) => {
            this.weatherData = response;
            this.weatherData.current.time = response.current.last_updated.slice(-5);
            console.log(response);
        },
      });
  }
  
  addToSelected(item: WeatherData) {
    this.saveData(item);
    this.selectedList.push(item);    
  }

  isAdded(item: WeatherData): boolean {
    return this.selectedList.some((selectedItem) => selectedItem.location.name === item.location.name);
  }

  deleteFromSelected(item:WeatherData){
    this.removeData(item);
    this.selectedList = this.selectedList.filter((d) => d.location.name !== item.location.name);
  }

  async saveData(item: WeatherData): Promise<void> {
    await this.storageService.set(item.location.name, item);
  }
  
  async removeData(item:WeatherData){
    await this.storageService.remove(item.location.name);
  }
 
  openDialog(item:any){
    this.dialogRef.open(PopUpComponent,{
      data : {
        data : item
      }
    });
  }
}