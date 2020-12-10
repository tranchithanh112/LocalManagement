import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  emptyList: any[] = [1998];
  cityId!: string;
  cityName!: string;
  cityList: any[] = [];
  districtList: any;
  wardList: any[] = [];
  wardId!: string;
  districtId!: string;
  districtsall: any;
  wardsall: any;
  constructor(private service: SharedService) {}
  onCityChange(event: any) {
    console.log(event);
    this.service.getDistrictById(event).subscribe((data: any) => {
      this.districtsall = data.district;
      this.wardsall = data.ward;
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
