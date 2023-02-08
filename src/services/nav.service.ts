import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  visible: any = true;
  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
