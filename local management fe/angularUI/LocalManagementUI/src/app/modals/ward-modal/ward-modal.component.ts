import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { WardComponent } from 'src/app/ward/ward.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-ward-modal',
  templateUrl: './ward-modal.component.html',
  styleUrls: ['./ward-modal.component.scss'],
})
export class WardModalComponent implements OnInit {
  @Input() isVisible2: boolean = false;
  @Input() isVisible: boolean = false;
  @Input() wd: any;
  @Output() closeWard: EventEmitter<any> = new EventEmitter();

  constructor(
    private _wardService: WardComponent,
    private message: NzMessageService,
    private service: SharedService
  ) {}
  wardName!: string;
  wardId!: string;
  districtId!: string;
  districtList: any[] = [];
  ngOnInit(): void {
    this.wardName = this.wd.wardName;
    this.wardId = this.wd.wardId;
    this.districtId = this.wd.districtId;

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
      this.message.info(`mời bạn nhập đầy đủ thông tin`);
    } else {
      this.service.postWard(val).subscribe((res) => {
        this.message.info(`thêm thành công`);
        this._wardService.refreshWardList();
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
    if (event.code === 'Enter') this.updateWard();
  }
  updateWard() {
    let val = {
      wardName: this.wardName,
      districtId: this.districtId,
      wardId: this.wardId,
    };
    if (val.wardName == '' || val.districtId == null) {
      this.message.info(`mời bạn nhập đầy đủ thông tin`);
    } else {
      this.service.putWard(val).subscribe((res) => {
        this.message.info(`Sửa thành công`);
        this._wardService.refreshWardList();
      });

      this.handleCancel();
    }
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
    this.isVisible = false;
    this.closeWard.emit(this.isVisible2);
    this.closeWard.emit(this.isVisible);
  }
}
