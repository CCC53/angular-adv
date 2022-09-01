import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, Data } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  title: string = '';
  titleSubs: Subscription;

  constructor(private router: Router) {
    this.titleSubs = this.getDataFromRouter().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
      this.titleSubs.unsubscribe();
  }

  getDataFromRouter(): Observable<Data> {
    return this.router.events.pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

}
