import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public companies: any;

  constructor(private companiesService: CompaniesService) {
    this.listCompanies();
  }

  ngOnInit(): void {
  }

  public listCompanies() {
    this.companiesService.list().subscribe((result: any) => {
      this.companies = result.slice(0, 10);
    });
  }

}
