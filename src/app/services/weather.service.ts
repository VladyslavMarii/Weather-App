import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<WeatherData>{
    return this.http.get<WeatherData>('https://weatherapi-com.p.rapidapi.com/current.json', {
      headers: new HttpHeaders()
      .set('X-RapidAPI-Key', 'X-RapidAPI-Key')
      .set('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com'),
      params: new HttpParams()
      .set('q', cityName)
    })
  }
}
