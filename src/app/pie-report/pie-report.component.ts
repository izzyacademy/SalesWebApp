import { Component, OnInit } from '@angular/core';
import {ProductSalesReportForDate} from '../models/report-response';
import {ReportService} from '../report.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ErrorMessage} from '../models/errors';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-report',
  templateUrl: './pie-report.component.html',
  styleUrls: ['./pie-report.component.css']
})
export class PieReportComponent implements OnInit {

  private svg;
  private margin = 50;
  private width = 1000;
  private height = 750;

  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  private isError = false;

  private errorMessage;

  public data: ProductSalesReportForDate[] = [];

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

    this.service.getProductSalesForDate(this.reportDate).subscribe(
      (successResponse) => this.processSuccessResponse(successResponse),
      (errorResponse) => this.processErrorResponse(errorResponse),
      () => this.paintReport()
    );
  }

  private processSuccessResponse(response): void {
    this.data = response.body;

  }

  public processErrorResponse(response: any): void {

    const errorObject = response.error as ErrorMessage;

    this.isError = true;
    this.errorMessage = errorObject.errorMessage;
  }

  private paintReport(): void {

    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3.select('figure#piechart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.orderTotal.toString()))
      .range(['violet', 'orange', 'yellow', 'blue', 'indigo']);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.orderTotal));

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d, i) => (this.colors(i)))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text(d => d.data.productId)
      .attr('transform', d => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }
}
