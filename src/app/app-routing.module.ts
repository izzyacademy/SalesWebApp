import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BarReportComponent} from './bar-report/bar-report.component';
import {PieReportComponent} from './pie-report/pie-report.component';
import {ScatterReportComponent} from './scatter-report/scatter-report.component';

// Route definitions
const routes: Routes = [
  {path: '', component: BarReportComponent, pathMatch: 'full'},
  {path: 'bar-charts', component: BarReportComponent},
  {path: 'pie-charts', component: PieReportComponent},
  {path: 'scatter-plots', component: ScatterReportComponent}
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
