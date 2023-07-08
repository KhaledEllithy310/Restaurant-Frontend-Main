import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-countnumber',
  templateUrl: './countnumber.component.html',
  styleUrls: ['./countnumber.component.css'],
})
export class CountnumberComponent implements OnInit {
 
  @ViewChild('counterRef', { static: true }) counterElement1!: ElementRef;
  @ViewChild('counterRef2', { static: true }) counterElement2!: ElementRef;
  @ViewChild('counterRef3', { static: true }) counterElement3!: ElementRef;
  @ViewChild('counterRef4', { static: true }) counterElement4!: ElementRef;

  counter1$: Observable<number> | null = null;
  counter2$: Observable<number> | null = null;
  counter3$: Observable<number> | null = null;
  counter4$: Observable<number> | null = null;

  MAX_COUNT_1 = 200;
  MAX_COUNT_2 = 180;
  MAX_COUNT_3 = 350;
  MAX_COUNT_4 = 20;

  constructor() {}

  ngOnInit() {
    const options = {
      rootMargin: '-50px 0px',
      threshold: 0,
    };
    //  this is for the first counter
    const observer1 = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.counter1$ === null) {
          this.counter1$ = new Observable<number>((observer) => {
            let count = 100;
            const intervalId = setInterval(() => {
              if (count <= this.MAX_COUNT_1) {
                observer.next(count++);
              } else {
                observer.complete();
              }
            }, 130);

            return () => {
              clearInterval(intervalId);
              observer.complete();
            };
          });

          this.counter1$.subscribe((count) => {
            this.counterElement1.nativeElement.innerHTML = count.toString();
          });

          observer1.unobserve(this.counterElement1.nativeElement);

          setTimeout(() => {
            this.counter1$ = null;
          }, 11250);
        }
      }
    }, options);
    // this is for counter2
    const observer2 = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.counter2$ === null) {
          this.counter2$ = new Observable<number>((observer) => {
            let count = 100;
            const intervalId = setInterval(() => {
              if (count <= this.MAX_COUNT_2) {
                observer.next(count++);
              } else {
                observer.complete();
              }
            }, 100);

            return () => {
              clearInterval(intervalId);
              observer.complete();
            };
          });

          this.counter2$.subscribe((count) => {
            this.counterElement2.nativeElement.innerHTML = count.toString();
          });

          observer2.unobserve(this.counterElement2.nativeElement);

          setTimeout(() => {
            this.counter2$ = null;
          }, 11250);
        }
      }
    }, options);
    //  this is for counter3
    const observer3 = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.counter3$ === null) {
          this.counter3$ = new Observable<number>((observer) => {
            let count = 250;
            const intervalId = setInterval(() => {
              if (count <= this.MAX_COUNT_3) {
                observer.next(count++);
              } else {
                observer.complete();
              }
            }, 90);

            return () => {
              clearInterval(intervalId);
              observer.complete();
            };
          });

          this.counter3$.subscribe((count) => {
            this.counterElement3.nativeElement.innerHTML = count.toString();
          });

          observer3.unobserve(this.counterElement3.nativeElement);

          setTimeout(() => {
            this.counter3$ = null;
            // this.counterElement3.nativeElement.innerHTML = 'Done!';
          }, 11250);
        }
      }
    }, options);
    const observer4 = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.counter4$ === null) {
          this.counter4$ = new Observable<number>((observer) => {
            let count = 0;
            const intervalId = setInterval(() => {
              if (count <= this.MAX_COUNT_4) {
                observer.next(count++);
              } else {
                observer.complete();
              }
            }, 250);

            return () => {
              clearInterval(intervalId);
              observer.complete();
            };
          });

          this.counter4$.subscribe((count) => {
            this.counterElement4.nativeElement.innerHTML = count.toString();
          });

          observer4.unobserve(this.counterElement4.nativeElement);

          setTimeout(() => {
            this.counter4$ = null;
          }, 50);
        }
      }
    }, options);

    observer1.observe(this.counterElement1.nativeElement);
    observer2.observe(this.counterElement2.nativeElement);
    observer3.observe(this.counterElement3.nativeElement);
    observer4.observe(this.counterElement4.nativeElement);
  }
}
