import {Component, Input, OnChanges, AfterViewInit, Output, OnInit, ElementRef, ViewChild} from '@angular/core';
declare var Chart: any;

@Component({
  selector: 'chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

	@ViewChild('chartElement') chartElement?:ElementRef;
	@Input() labels: any;
	@Input() counts: any;

  private chart: any;
  private initiated = false;
  private chartCtx: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.chartElement) {
      this.chartCtx = this.chartElement.nativeElement.getContext('2d');
      if (this.counts) {
        this.chart = new Chart(this.chartCtx, {
          type: 'bar',
          data: {
            labels: this.labels,
            datasets: [{
              data: this.counts,
              backgroundColor: [
                'rgba(78, 89, 255, 1)'
              ],
              
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                title: {
                  display: true,
                  align: "end",
                  text:"Montant (en €)"
                },
                beginAtZero: true
              },
              x: {
                title: {
                  display: true,
                  align: "end",
                  text:"Année"
                },
              }
            }
          }
        });
        
      }
      this.initiated = true;
    }
  }

}
