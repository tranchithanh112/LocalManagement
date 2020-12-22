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
  pageSize = 5;
  meta: any;
  public ct: any;
  fromModal(event: any) {
    console.log(event);
    this.isVisible2 = event;
    this.isVisible = event;
  }
  showEdit(data: any): void {
    this.isVisible = true;
    this.ct = {
      cityName: data.cityName,
      cityId: data.cityId,
    };
  }
  showAdd() {
    this.isVisible2 = true;
    this.ct = {
      cityId: 0,
      cityName: '',
    };
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
  deleteClick(id: any) {
    if (confirm('Are you sure to delete this city ? ')) {
      this.service.deleteCity(id).subscribe((res) => {
        this.message.info('Đã xóa  ');
        this.refreshCityList();
      });
    }
  }
  onPageChange(event: any) {
    console.log(event);
    this.currentPage = event;
    this.refreshCityList();
  }
}
