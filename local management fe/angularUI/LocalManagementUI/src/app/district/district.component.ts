import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
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
      alert('Mời bạn nhập đủ thông tin ');
    } else {
      this.service.putDistrict(val).subscribe((res) => {
        alert('Sửa thành công ');
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
  constructor(private service: SharedService) {}
  refreshDistrictList() {
    this.service.getDistrictList().subscribe((data) => {
      this.districtList = data;
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
      alert('Mời bạn nhập đủ thông tin ');
    } else {
      console.log(val.cityId);
      this.service.postDistrict(val).subscribe((res) => {
        alert('Added');
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
  getIdCity() {
    this.service.getCityId().subscribe((res) => {
      this.cityIdList = res;
    });
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addClick();
    }
  }
  onKeyUpdate(event: KeyboardEvent) {
    if (event.code === 'Enter') this.updateDistrict();
  }
}
