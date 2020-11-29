// Adapted from https://blog.logrocket.com/data-visualization-angular-d3/

import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-report',
  templateUrl: './bar-report.component.html',
  styleUrls: ['./bar-report.component.css']
})
export class BarReportComponent implements OnInit {

  private dataUrl = 'http://localhost:8080/departments/sales/2020-11-01';

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  constructor() { }

  ngOnInit(): void {

    this.createSvg();

    // @ts-ignore
    d3.json(this.dataUrl).then(data => this.drawBars(data));
  }

  private createSvg(): void {

    this.svg = d3.select('figure#bar')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
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
      .attr('fill', '#d04a35');
  }
}
