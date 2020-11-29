import { Component, OnInit } from '@angular/core';
import {MaxProductSales, ProductSalesReportForDate} from '../models/report-response';
import {ReportService} from '../report.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorMessage} from '../models/errors';
import * as d3 from 'd3';
import {MathUtils} from '../utils';

@Component({
  selector: 'app-scatter-report',
  templateUrl: './scatter-report.component.html',
  styleUrls: ['./scatter-report.component.css']
})
export class ScatterReportComponent implements OnInit {

  private svg;
  private margin = 50;
  private width = 1300 - (this.margin * 2);
  private height = 900 - (this.margin * 2);

  private isError = false;

  private errorMessage;

  public data: MaxProductSales[] = [];

  private minX = 0;
  private maxX = 0;
  private minY = 0;
  private maxY = 0;

  constructor(private service: ReportService,
              private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.loadReport();

  }

  public loadReport(): void {

    this.service.getMaxProductSales().subscribe(
      (successResponse) => this.processSuccessResponse(successResponse),
      (errorResponse) => this.processErrorResponse(errorResponse),
      () => this.paintReport()
    );
  }

  private processSuccessResponse(response): void {

    this.data = response.body;

    const dates: number[] = []; // x axis
    const amounts: number[] = []; // y axis

    // extract the min,max x and y coordinates
    for (const item of this.data) {
      dates.push(item.salesDateNum);
      amounts.push(item.maxOrderAmount);
    }

    this.minX = MathUtils.getMin(dates) - 1;
    this.maxX = MathUtils.getMax(dates) + 2;

    this.minY = MathUtils.getMin(amounts) - 1;
    this.maxY = MathUtils.getMax(amounts) + 100;
  }

  public processErrorResponse(response: any): void {

    const errorObject = response.error as ErrorMessage;

    this.isError = true;
    this.errorMessage = errorObject.errorMessage;
  }

  private paintReport(): void {

    this.createSvg();
    this.drawPlot(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select('figure#scatterplot')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawPlot(data: MaxProductSales[]): void {

    // Add X axis
    const x = d3.scaleLinear()
      .domain([this.minX, this.maxX])
      .range([ 0, this.width ]);

    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([this.minY, this.maxY])
      .range([ this.height, 0]);

    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll('dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.salesDateNum))
      .attr('cy', d => y(d.maxOrderAmount))
      .attr('r', 7)
      .style('opacity', .5)
      .style('fill', 'green');

    // Add labels
    dots.selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .text(d => d.productName + ', $' + d.maxOrderAmount)
      .attr('x', d => x(d.salesDateNum))
      .attr('y', d => y(d.maxOrderAmount));
  }
}
