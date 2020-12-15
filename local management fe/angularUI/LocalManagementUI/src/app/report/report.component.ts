import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  dList: any[] = [];
  cityId!: string;
  cityName!: string;
  cityList: any[] = [];
  districtList: any[] = [];
  wardList: any[] = [];
  wardId!: string;
  districtId!: string;
  districtsall: any;
  wardsall: any;
  wList: any[] = [];
  constructor(private service: SharedService) {}
  onCityChange(event: any) {
    console.log(event);
    this.dList = [];
    this.service.getDistrictById(event).subscribe((data: any) => {
      this.dList = data;
      this.districtId = '';
      this.wList = [];
    });
  }
  onDistrictChange(event: any) {
    this.service.getWardById(event).subscribe((data: any) => {
      this.wList = data;
    });
  }
  ngOnInit(): void {
    this.refreshCityList();
  }
  refreshCityList() {
    this.service.getCityList().subscribe((data) => {
      this.cityList = data;
    });
  }
}
