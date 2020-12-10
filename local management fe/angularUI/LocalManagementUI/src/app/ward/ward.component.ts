import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
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
      alert('Mời bạn nhập đủ thông tin ');
    } else {
      this.service.putWard(val).subscribe((res) => {
        alert('Sửa thành công ');
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
  constructor(private service: SharedService) {}
  refreshWardList() {
    this.service.getWardList().subscribe((data) => {
      this.wardList = data;
    });
  }

  ngOnInit(): void {
    this.refreshWardList();
    this.getIdDistrict();
    console.log();
    this.service.getDistrictList().subscribe((data) => {
      this.districtList = data;
      this.getIdDistrict();
    });
    console.log(this.districtIdList);
  }

  addClick() {
    let val = {
      wardName: this.wardName,
      wardId: this.wardId,
      districtId: this.districtId,
    };
    if (val.wardName == '' || val.districtId == null) {
      alert('Mời bạn nhập đủ thông tin ');
    } else {
      this.service.postWard(val).subscribe((res) => {
        alert('Added');
        this.refreshWardList();
      });
      this.isVisible2 = false;
      console.log(this.wardId);
    }
  }
  deleteClick(id: any) {
    if (confirm('Are you sure to delete this city ? ')) {
      this.service.deleteWard(id).subscribe((res) => {
        alert('deleted');
        this.refreshWardList();
      });
    }
  }
  getIdDistrict() {
    this.service.getDistrictId().subscribe((res) => {
      this.districtIdList = res;
    });
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
