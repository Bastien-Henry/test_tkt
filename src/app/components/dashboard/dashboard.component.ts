import { Component, OnInit, HostListener } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public companies: any;
  public sectors: any;
  public filteredSectors?: Observable<string[]>;
  public displaySidebar: boolean = true;
  public inputSector = new FormControl();
  public sectorSelected = null;
  public valueSector: any;
  public companiesNames: any;
  public filteredCompanies?: Observable<string[]>;
  public inputCompany = new FormControl();
  public companySelected = null;
  public valueCompanyName: any;
  public loading: boolean = true;

  constructor(private companiesService: CompaniesService) {
    this.listCompanies();
    this.sectors = [];
    this.companiesNames = [];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSidebarDisplayed();
  }

  ngOnInit(): void {
    this.isSidebarDisplayed();
  }

  private _filterSectors(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sectors.filter((option: any) => option.toLowerCase().includes(filterValue));
  }

  private _filterCompanies(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.companiesNames.filter((option: any) => option.toLowerCase().includes(filterValue));
  }

  private isSidebarDisplayed() {
    if (window.innerWidth <= 768) {
      this.displaySidebar = false;
    } else {
      this.displaySidebar = true;
    }
  }

  public listCompanies() {
    this.companiesService.list().subscribe((result: any) => {
      this.companies = result.slice(0, 10);
      this.getSectors(this.companies);
      this.getCompaniesNames(this.companies);
      this.loading = false;
    });
  }

  public getSectors(companies: any) {
    for (var i = 0; companies.length > i; i++) {
      if (!this.sectors.includes(companies[i].sector)) {
        this.sectors.push(companies[i].sector);
      }
    }
    this.sectors = this.sectors.sort();
    this.filteredSectors = this.inputSector.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSectors(value || '')),
    );
  }

  public getCompaniesNames(companies: any) {
    for (var i = 0; companies.length > i; i++) {
      if (!this.companiesNames.includes(companies[i].name)) {
        this.companiesNames.push(companies[i].name);
      }
    }
    this.companiesNames = this.companiesNames.sort();
    this.filteredCompanies = this.inputCompany.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCompanies(value || '')),
    );
  }

  public selectSector(event: any) {
    this.sectorSelected = event.option.value;
  }

  public selectCompany(event: any) {
    this.companySelected = event.option.value;
  }
}
