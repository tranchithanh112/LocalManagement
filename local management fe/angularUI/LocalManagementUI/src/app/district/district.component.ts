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
  pageSize = 4;
  showModal(data: any): void {
    this.isVisible = true;
    this.districtName = data.districtName;
    this.cityId = data.cityId;
    this.districtId = data.districtId;
  }
  showAdd() {
    this.cityId = null;
    this.isVisible2 = true;
    this.districtId = '0';
    this.districtName = '';
    console.log(this.cityId);
  }

  updateDistrict() {
    let val = {
      districtName: this.districtName,
      cityId: this.cityId,
      districtId: this.districtId,
    };
    if (val.districtName == '' || val.cityId == null) {
      this.message.info(`mời bạn nhập đầy đủ thông tin`);
    } else {
      this.service.putDistrict(val).subscribe((res) => {
        this.message.info(`Sửa thành công`);
        this.refreshDistrictList();
      });

      this.handleCancel();
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.isVisible2 = false;
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

  addClick() {
    let val = {
      districtName: this.districtName,
      cityId: this.cityId,
      districtId: this.districtId,
    };
    if (val.districtName == '' || val.cityId == null) {
      this.message.info(`mời bạn nhập đầy đủ thông tin`);
    } else {
      console.log(val.cityId);
      this.service.postDistrict(val).subscribe((res) => {
        this.message.info(`thêm thành công`);
        this.refreshDistrictList();
      });
      this.isVisible2 = false;
    }
  }
  deleteClick(id: any) {
    if (confirm('Are you sure to delete this city ? ')) {
      this.service.deleteDistrict(id).subscribe((res) => {
        alert('deleted');
        this.refreshDistrictList();
      });
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addClick();
    }
  }
  onKeyUpdate(event: KeyboardEvent) {
    if (event.code === 'Enter') this.updateDistrict();
  }
  onPageChange(event: any) {
    console.log(event);
    this.currentPage = event;
    this.refreshDistrictList();
  }
}
