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

  constructor(private route: ActivatedRoute, private companiesService: CompaniesService, private resultsServices: ResultsService) {
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
      this.getResults(this.company.results);
    });
  }

  public getResults(resultsIds: any) {
    console.log(resultsIds);
    this.results = [];
    for (var i = 0; resultsIds.length > i; i++) {
      this.resultsServices.getById(resultsIds[i]).subscribe((result: any) => {
        console.log(result);
      });
    }
  }
}
