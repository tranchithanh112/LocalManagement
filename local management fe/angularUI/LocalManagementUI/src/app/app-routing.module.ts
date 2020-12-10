import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city/city.component';
import { DistrictComponent } from './district/district.component';
import { ReportComponent } from './report/report.component';
import { WardComponent } from './ward/ward.component';

const routes: Routes = [
  {path:"city", component:CityComponent},
  {path:"district", component:DistrictComponent},
  {path:"ward", component:WardComponent},
  {path:"report", component:ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
