import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { SiderMenuComponent } from './sider-menu/sider-menu.component';
import { CityComponent } from './city/city.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DistrictComponent } from './district/district.component';
import { WardComponent } from './ward/ward.component';
import { ReportComponent } from './report/report.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FilterNamePipe } from './filter-name.pipe';
import { CityModalComponent } from './modals/city-modal/city-modal.component';
import { DistrictModalComponent } from './modals/district-modal/district-modal.component';
import { WardModalComponent } from './modals/ward-modal/ward-modal.component';
import { CommonModule } from '@angular/common';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SiderMenuComponent,
    CityComponent,

    DistrictComponent,

    WardComponent,

    ReportComponent,

    FilterNamePipe,

    CityModalComponent,

    DistrictModalComponent,

    WardModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzGridModule,
    NzMessageModule,
    NzFormModule,
    CommonModule,
    NzPaginationModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
