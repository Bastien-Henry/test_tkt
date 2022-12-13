import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';
import { ResultsService } from 'src/app/services/results.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'company',
  templateUrl: 'company.component.html',
  styleUrls: ['company.component.css']
})
export class CompanyComponent implements OnInit {

  public company: any;
  public results?: [];
  public data: any;
  public countResults: number = 0;
  public loading: boolean = true;

  constructor(private route: ActivatedRoute, private companiesService: CompaniesService, private resultsServices: ResultsService) {
    this.data = {
      ca: {
        labels: [],
        count: []
      },
      ebitda: {
        labels: [],
        count: []
      },
      loss: {
        labels: [],
        count: []
      },
      margin: {
        labels: [],
        count: []
      }
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (typeof params['id'] != 'undefined') { 
        this.getCompany(params['id']); 
      }
    });
  }

  public getCompany(id: string) {
    this.companiesService.getById(id).subscribe((result: any) => {
      this.company = result;
      this.countResults = this.company.results.length;
      this.getResults(this.company.results);
    });
  }

  public getResults(resultsIds: any) {
    this.results = [];
    let numberResultFormatted = 0;
    for (var i = 0; resultsIds.length > i; i++) {
      this.resultsServices.getById(resultsIds[i]).subscribe((result: any) => {
        this.formatData(result);
        numberResultFormatted++;
        if (numberResultFormatted === this.countResults) {
          this.loading = false;
        }
      });
    }
  }

  public formatData(result: any) {
    this.data.ca.labels.push(result.year);
    this.data.ca.count.push(result.ca);
    this.data.ebitda.labels.push(result.year);
    this.data.ebitda.count.push(result.ebitda);
    this.data.loss.labels.push(result.year);
    this.data.loss.count.push(result.loss);
    this.data.margin.labels.push(result.year);
    this.data.margin.count.push(result.margin);
  }
}
