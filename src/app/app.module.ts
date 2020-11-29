import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarReportComponent } from './bar-report/bar-report.component';
import { PieReportComponent } from './pie-report/pie-report.component';
import { ScatterReportComponent } from './scatter-report/scatter-report.component';

@NgModule({
  declarations: [
    AppComponent,
    BarReportComponent,
    PieReportComponent,
    ScatterReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
