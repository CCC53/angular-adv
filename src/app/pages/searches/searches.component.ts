import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalSearchResp } from 'src/types/search';
import { SearchesService } from '../../services/searches.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css']
})
export class SearchesComponent implements OnInit {

  data: GlobalSearchResp = {
    users: [],
    hospitals: [],
    doctors: []
  }

  constructor(private activatedRoute: ActivatedRoute, private searchesService: SearchesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.loadData(term);
    });
  }

  loadData(term: string) {
    this.searchesService.globalSearch(term).subscribe(res => this.data = res);
  }

}
