import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.scss'],
})
export class WardComponent implements OnInit {
  districtIdList: any = [];
  districtId!: any;
  wardList: any = [];
  wardName!: string;
  wardId!: string;
  isVisible = false;

  isVisible2 = false;
  districtList: any[] = [];
  showModal(data: any): void {
    this.isVisible = true;
    this.wardName = data.wardName;
    this.districtId = data.districtId;
    this.wardId = data.wardId;
  }
  showAdd() {
    this.isVisible2 = true;
    this.wardId = '0';
    this.wardName = '';
    this.districtId = null;
  }

  updateWard() {
    let val = {
      wardName: this.wardName,
      districtId: this.districtId,
      wardId: this.wardId,
    };
    if (val.wardName == '' || val.districtId == null) {
      this.message.info('Mời bạn nhập đủ thông tin ');
    } else {
      this.service.putWard(val).subscribe((res) => {
        this.message.info('Sửa thành công  ');
        this.refreshWardList();
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
  refreshWardList() {
    this.service.getWardList().subscribe((data) => {
      this.wardList = data;
    });
  }

  ngOnInit(): void {
    this.refreshWardList();

    console.log();
    this.service.getDistrictList().subscribe((data) => {
      this.districtList = data;
    });
  }

  addClick() {
    let val = {
      wardName: this.wardName,
      wardId: this.wardId,
      districtId: this.districtId,
    };
    if (val.wardName == '' || val.districtId == null) {
      this.message.info('Mời bạn nhập đủ thông tin ');
    } else {
      this.service.postWard(val).subscribe((res) => {
        this.message.info('Thêm thành công  ');
        this.refreshWardList();
      });
      this.isVisible2 = false;
      console.log(this.wardId);
    }
  }
  deleteClick(id: any) {
    if (confirm('Are you sure to delete this city ? ')) {
      this.service.deleteWard(id).subscribe((res) => {
        this.message.info('Đã xóa ');
        this.refreshWardList();
      });
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.addClick();
    }
  }
  onKeyUpdate(event: KeyboardEvent) {
    if (event.code === 'Enter') this.updateWard();
  }
}
