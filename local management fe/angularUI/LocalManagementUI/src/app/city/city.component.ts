import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  cityList: any = [];
  cityName!: string;
  cityId!: string;
  isVisible = false;
  city!: any;
  isVisible2 = false;
  loading: boolean = false;
  currentPage = 1;
  total = 1;
  pageSize = 4;
  meta: any;

  showModal(data: any): void {
    this.isVisible = true;
    this.cityName = data.cityName;
    this.cityId = data.cityId;
  }
  showAdd() {
    this.isVisible2 = true;
    this.cityId = '0';
    this.cityName = '';
  }

  updateCity() {
    let val = {
      cityName: this.cityName,
      cityId: this.cityId,
    };
    if (val.cityName == '') {
      this.message.info('Mời bạn nhập đủ thông tin ');
    } else {
      console.log('Button ok clicked!');

      this.service.putCity(val).subscribe((res) => {
        this.message.info(`sửa thành công `);
        this.refreshCityList();
      });
    }

    this.handleCancel();
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
  refreshCityList() {
    console.log(this.currentPage);
    this.service
      .getCityPage(this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.cityList = data.thanhphos;
        this.meta = data;
        this.total = data.totalCount;
        this.currentPage = data.currentPage;
        console.log(data);
        this.pageSize = data.pageSize;
      });
  }

  ngOnInit(): void {
    this.refreshCityList();
  }
  addClick() {
    let val = {
      cityName: this.cityName,
      cityId: this.cityId,
    };
    if (val.cityName == '') {
      this.message.info('Mời bạn nhập đủ thông tin ');
    } else {
      this.service.postCity(val).subscribe((res) => {
        this.message.info('Thêm thành công ');
        this.refreshCityList();
      });
      this.isVisible2 = false;
    }
  }
  deleteClick(id: any) {
    if (confirm('Are you sure to delete this city ? ')) {
      this.service.deleteCity(id).subscribe((res) => {
        this.message.info('Đã xóa  ');
        this.refreshCityList();
      });
    }
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addClick();
    }
  }
  onKeyUpdate(event: KeyboardEvent) {
    if (event.code === 'Enter') this.updateCity();
  }

  onPageChange(event: any) {
    console.log(event);
    this.currentPage = event;
    this.refreshCityList();
  }
}
