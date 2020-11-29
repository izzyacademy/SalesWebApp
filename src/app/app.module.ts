import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarReportComponent } from './bar-report/bar-report.component';
import { PieReportComponent } from './pie-report/pie-report.component';
import { ScatterReportComponent } from './scatter-report/scatter-report.component';
import { ReportService } from './report.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

// Route definitions
const routes: Routes = [
  {path: '', component: BarReportComponent, pathMatch: 'full'},
  {path: 'bar-charts/:reportDate', component: BarReportComponent},
  {path: 'pie-charts/:reportDate', component: PieReportComponent},
  {path: 'bar-charts', component: BarReportComponent},
  {path: 'pie-charts', component: PieReportComponent},
  {path: 'scatter-plots', component: ScatterReportComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BarReportComponent,
    PieReportComponent,
    ScatterReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
