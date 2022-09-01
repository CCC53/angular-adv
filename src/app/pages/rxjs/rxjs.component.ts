import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSub: Subscription;

  constructor() {
    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe(res => console.log(`EDG ${res}`), error => console.error(error), () => console.log('Uwu'));
    this.intervalSub = this.returnInterval().subscribe(console.log);
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
      this.intervalSub.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(150).pipe(
      // take(12),
      map(value => value+1),
      filter(value => value%2 === 0)
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 2) {
          observer.error('ia estufas');
        }
        if (i === 6) {
          clearInterval(interval);
          observer.complete();
        }
      }, 1000)
    });
  }

}