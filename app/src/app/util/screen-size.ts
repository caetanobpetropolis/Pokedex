
import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenSize {
    public isDesktopSubject = new BehaviorSubject<boolean>(this.getIsDesktop());
    isDesktop$ = this.isDesktopSubject.asObservable();

    constructor() {
        fromEvent(window, 'resize')
            .pipe(
                map(() => this.getIsDesktop()),
                startWith(this.getIsDesktop())
            )
            .subscribe((value) => this.isDesktopSubject.next(value));
    }

    public getIsDesktop(): boolean {
        return window.innerWidth >= 768;
    }
}