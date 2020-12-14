import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { baocao } from 'src/app/reportModel';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  emptyList: any[] = [];

  cityList: any[] = [];
  districtList: any[] = [];
  wardList: any[] = [];
  wardId!: string;
  districtId!: string;
  districtsall: any;
  cityall: any;
  wardsall: any;

  baoCaoAll: any[] = [];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.service.getCityList().subscribe((res: any) => {
      this.cityList = res;
      this.cityList.forEach((item) => {
        this.service.getDistrictById(item.cityId).subscribe((resful: any) => {
          item.districtName = resful.map((x: any) => x.districtName);

          item.wardName = '';
          resful.forEach((item_1: any) => {
            this.service
              .getWardById(item_1.districtId)
              .subscribe((result: any) => {
                if (
                  result != null &&
                  result != undefined &&
                  result.length > 0
                ) {
                  console.log(result.sort());
                  var name = result.map((x: any) => x.wardName);

                  if (name != null && name.length > 0) {
                    name.forEach((ele: string) => {
                      item.wardName += ele + ',';

                      console.log(item.wardName);
                    });
                  }
                }
              });
          });
        });
      });
    });

    this.service.getDistrictList().subscribe((res: any) => {
      this.districtList = res;
    });
  }
}
