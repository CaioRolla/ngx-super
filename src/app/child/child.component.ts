import { Component, Input } from '@angular/core';
import { LogMethod, ObserveInput } from 'lib/decorators/public_api';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {
  @Input() firstName!: string;

  @ObserveInput() firstName$!: Observable<string>;

  ngOnInit() {
    this.test('Something');
  }

  @LogMethod()
  public test(args: any) {
    return 'OK';
  }
}
