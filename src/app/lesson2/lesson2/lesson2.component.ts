import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-lesson2',
  templateUrl: './lesson2.component.html',
  styleUrls: ['./lesson2.component.scss']
})
export class Lesson2Component implements OnInit, OnDestroy {

  private subject: Subject<boolean>; //event emmiter dla observable
  private someSubscription: Subscription;
  private sampleArray = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let someObservable = this.getSomeObservable();

    console.log('odpalanie subscribe');
    this.launchObservable(someObservable);

    console.log('odpalanie unsubscribe');
    this.someSubscription = this.getSomeObservable().subscribe();
    this.someSubscription = this.getSomeObservable().subscribe();
    this.someSubscription = this.getSomeObservable().subscribe();
    this.someSubscription = this.getSomeObservable().subscribe();
    this.someSubscription = this.getSomeObservable().subscribe();

    console.log('odpalanie pipe');
    this.pipeObservable(someObservable);

    console.log('odpalanie map');
    this.mapObservable(someObservable);

    console.log('odpalanie subject');
    this.subjectObservable();

    console.log('koncieczenia za pomoca takeUntil');
    this.endingObservable(someObservable);
  }

  private getSomeObservable() {
    return new Observable<number>(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 2000);
    });
  }

  pipeObservable(someObservable: Observable<number>) {
    someObservable.pipe(
    );
  }

  test(x) {
    this.sampleArray.push(x);
  }

  launchObservable(someObservable: Observable<number>) {
    this.http.get('https://jsonplaceholder.typicode.com/comments?postId=1').subscribe(
      (data) => console.log(data),
      error => console.log(error)
    );

    this.http.get('https://jsonplaceholder.typicode.com/comments?postId=1').pipe(
      map(post => this.test(post)),
    ).subscribe();

    this.sampleArray.push('start');
    someObservable.subscribe(x => this.test(x));
    this.sampleArray.push('koniec');
  }

  mapObservable(someObservable: Observable<number>) {
    someObservable.pipe(
      map(x => x * 10),
      filter( x => x < 21),
      map(x => console.log( x - 4 )),
      takeUntil(this.subject)
    ).subscribe();
  }

  endingObservable(someObservable: Observable<number>) {
    someObservable.pipe(
      takeUntil(this.subject)
    );
  }

  subjectObservable() {
    this.subject = new Subject<boolean>();
  }

  ngOnDestroy(): void {
    this.someSubscription.unsubscribe();

    this.subject.next(true);
    this.subject.complete();
  }

}
