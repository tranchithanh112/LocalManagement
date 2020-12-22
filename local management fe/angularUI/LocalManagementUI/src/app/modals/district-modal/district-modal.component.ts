import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { DistrictComponent } from 'src/app/district/district.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-district-modal',
  templateUrl: './district-modal.component.html',
  styleUrls: ['./district-modal.component.scss'],
})
export class DistrictModalComponent implements OnInit {
  @Input() isVisible2: boolean = false;
  @Input() isVisible: boolean = false;
  @Input() dt: any;
  @Output() closeDistrict: EventEmitter<any> = new EventEmitter();
  districtName!: string;
  districtId!: string;
  cityId!: string;
  cityList: any[] = [];
  constructor(
    private _districtService: DistrictComponent,
    private message: NzMessageService,
    private service: SharedService
  ) {}

  ngOnInit(): void {
    console.log(this.dt);
    this.districtName = this.dt.districtName;
    console.log(this.districtName);
    this.cityId = this.dt.cityId;
    this.districtId = this.dt.districtId;

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
        this._districtService.refreshDistrictList();
      });
      this.isVisible2 = false;
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
        this._districtService.refreshDistrictList();
      });

      this.handleCancel();
    }
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
    this.isVisible = false;
    this.closeDistrict.emit(this.isVisible2);
    this.closeDistrict.emit(this.isVisible);
  }
}
