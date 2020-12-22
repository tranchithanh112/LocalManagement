import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss'],
})
export class DistrictComponent implements OnInit {
  cityIdList: any = [];
  cityId!: any;
  districtList: any = [];
  districtName!: string;
  districtId!: string;
  isVisible = false;
  isVisible2 = false;
  cityList: any[] = [];
  currentPage = 1;
  total = 1;
  pageSize = 5;
  public dt: any;
  fromModal(event: any) {
    console.log(event);
    this.isVisible2 = event;
    this.isVisible = event;
  }
  showEdit(data: any): void {
    this.isVisible = true;
    this.dt = {
      districtName: data.districtName,
      cityId: data.cityId,
      districtId: data.districtId,
    };
    console.log(this.dt);
  }
  showAdd() {
    this.dt = {
      districtName: '',
      cityId: null,
      districtId: 0,
    };
    this.isVisible2 = true;
  }
  constructor(
    private service: SharedService,
    private message: NzMessageService
  ) {}
  refreshDistrictList() {
    this.service
      .getDistrictPage(this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.districtList = data.quan;
        this.total = data.totalCount;
        this.currentPage = data.currentPage;
        this.pageSize = data.pageSize;
        console.log(data);
      });
  }

  ngOnInit(): void {
    this.refreshDistrictList();
    this.service.getCityList().subscribe((data) => {
      this.cityList = data;
    });
  }

  deleteClick(id: any) {
    if (confirm('Are you sure to delete this city ? ')) {
      this.service.deleteDistrict(id).subscribe((res) => {
        alert('deleted');
        this.refreshDistrictList();
      });
    }
  }

  onPageChange(event: any) {
    console.log(event);
    this.currentPage = event;
    this.refreshDistrictList();
  }
}
