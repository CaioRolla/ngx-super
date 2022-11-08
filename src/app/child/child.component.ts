import { Component, Input } from '@angular/core';
import { LogMethod } from 'lib/decorators/log.decorator';
import { ObserveInput } from 'lib/decorators/observe-input.decorator';
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
