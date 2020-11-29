import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {DepartmentSalesReportForDate} from '../models/report-response';
import {ReportService} from '../report.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ErrorMessage} from '../models/errors';

@Component({
  selector: 'app-bar-report',
  templateUrl: './bar-report.component.html',
  styleUrls: ['./bar-report.component.css']
})
export class BarReportComponent implements OnInit {

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private isError = false;

  private errorMessage;

  public reportData: DepartmentSalesReportForDate[] = [];

  public reportDate: string;

  constructor(private service: ReportService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.loadReport();

  }

  public loadReport(): void {

    this.route.params.subscribe(
      (params: Params) => {
        const dateParam: string = params.hasOwnProperty('reportDate') ? params.reportDate : '2020-11-01';
        this.reportDate = dateParam;
      }
    );

    this.service.getDepartmentSalesForDate(this.reportDate).subscribe(
      (successResponse) => this.processSuccessResponse(successResponse),
      (errorResponse) => this.processErrorResponse(errorResponse),
      () => this.paintReport()
    );
  }

  private processSuccessResponse(response): void {
    this.reportData = response.body;

  }

  public processErrorResponse(response: any): void {

    const errorObject = response.error as ErrorMessage;

    this.isError = true;
    this.errorMessage = errorObject.errorMessage;
  }

  private paintReport(): void {

    this.createSvg();

    this.drawBars(this.reportData);
  }

  private createSvg(): void {

    this.svg = d3.select('figure#barcharts')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: DepartmentSalesReportForDate[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.department))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 1000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.department))
      .attr('y', d => y(d.orderTotal))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.orderTotal))
      .attr('fill', 'maroon');
  }
}
