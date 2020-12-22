import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CityComponent } from 'src/app/city/city.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-city-modal',
  templateUrl: './city-modal.component.html',
  styleUrls: ['./city-modal.component.scss'],
})
export class CityModalComponent implements OnInit {
  constructor(
    private _cityService: CityComponent,
    private message: NzMessageService,
    private service: SharedService
  ) {}
  @Input() isVisible2: boolean = false;
  @Input() isVisible: boolean = false;
  @Input() ct: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  cityName!: string;
  cityId!: string;
  ngOnInit(): void {
    this.cityName = this.ct.cityName;
    this.cityId = this.ct.cityId;
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
        this._cityService.refreshCityList();
      });
      this.isVisible2 = false;
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
    this.isVisible = false;
    this.close.emit(this.isVisible2);
    this.close.emit(this.isVisible);
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
        this._cityService.refreshCityList();
      });
    }

    this.handleCancel();
  }
  onKeyUpdate(event: KeyboardEvent) {
    if (event.code === 'Enter') this.updateCity();
  }
  onKeyAdd(event: KeyboardEvent) {
    if (event.code === 'Enter') this.addClick();
  }
}
