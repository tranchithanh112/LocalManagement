import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

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
      alert('Mời bạn nhập đủ thông tin ');
    } else {
      console.log('Button ok clicked!');

      this.service.putCity(val).subscribe((res) => {
        alert('Sửa thành công ');
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
  constructor(private service: SharedService) {}
  refreshCityList() {
    this.service.getCityList().subscribe((data) => {
      this.cityList = data;
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
      alert('Mời bạn nhập đủ thông tin ');
    } else {
      this.service.postCity(val).subscribe((res) => {
        alert('Added');
        this.refreshCityList();
      });
      this.isVisible2 = false;
    }
  }
  deleteClick(id: any) {
    if (confirm('Are you sure to delete this city ? ')) {
      this.service.deleteCity(id).subscribe((res) => {
        alert('deleted');
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
}
