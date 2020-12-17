import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly Url = 'https://localhost:44398/api';
  constructor(private http: HttpClient) {}
  getCityList(): Observable<any[]> {
    return this.http.get<any>(this.Url + '/cities');
  }
  getDistrictList(): Observable<any> {
    return this.http.get<any>(this.Url + '/districts');
  }
  getWardList(): Observable<any> {
    return this.http.get<any>(this.Url + '/wards');
  }

  postCity(val: any) {
    return this.http.post(this.Url + '/cities', val);
  }
  putCity(val: any) {
    return this.http.put(this.Url + '/cities/PutCity', val);
  }
  deleteCity(id: any) {
    return this.http.delete(this.Url + '/cities/' + id);
  }

  postDistrict(val: any) {
    return this.http.post(this.Url + '/districts', val);
  }
  putDistrict(val: any) {
    return this.http.put(this.Url + '/districts/' + val.districtId, val);
  }
  deleteDistrict(id: any) {
    return this.http.delete(this.Url + '/districts/' + id);
  }
  postWard(val: any) {
    return this.http.post(this.Url + '/Wards', val);
  }
  putWard(val: any) {
    return this.http.put(this.Url + '/Wards/' + val.wardId, val);
  }
  deleteWard(id: any) {
    return this.http.delete(this.Url + '/Wards/' + id);
  }
  getCityId() {
    return this.http.get(this.Url + '/cities/listid');
  }
  getDistrictId() {
    return this.http.get(this.Url + '/districts/listid');
  }
  getDistrictById(id: any) {
    console.log(id);
    console.log(this.Url + '/districts/GetDistrict/' + id);
    return this.http.get(this.Url + '/districts/GetDistrict/' + id);
  }
  getWardById(id: any) {
    return this.http.get(this.Url + '/wards/GetWard/' + id);
  }
  getAll() {
    return this.http.get(this.Url + '/districts/getall');
  }
}
