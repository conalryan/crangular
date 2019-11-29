import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { strCells } from './calendar-grid-data.stub';

@Component({
  selector: 'cr-parts',
  template: `
    <h3>Parts</h3>

    <h4>Row</h4>
    <cr-calendar-grid-row class="border">Inside a row</cr-calendar-grid-row>
    <pre>
      <code>
        &lt;cr-calendar-grid-row&gt;Inside a row&lt;/cr-calendar-grid-row&gt;
      </code>
    </pre>

    <h4>Label</h4>
    <cr-calendar-grid-label>Inside a label</cr-calendar-grid-label>
    <pre>
      <code>
        &lt;cr-calendar-grid-label&gt;Inside a label&lt;/cr-calendar-grid-label&gt;
      </code>
    </pre>

    <h4>Cell</h4>
    <cr-calendar-grid-cell>Inside a Cell</cr-calendar-grid-cell>
    <pre>
      <code>
        &lt;cr-calendar-grid-cell&gt;Inside a cell&lt;/cr-calendar-grid-cell&gt;
      </code>
    </pre>

    <h4>Row Label Cells Static</h4>
    <cr-calendar-grid-row>
      <cr-calendar-grid-label>Inside a label</cr-calendar-grid-label>
      <cr-calendar-grid-cell>Inside cell 1</cr-calendar-grid-cell>
      <cr-calendar-grid-cell>Inside cell 2</cr-calendar-grid-cell>
      <cr-calendar-grid-cell>Inside cell 3</cr-calendar-grid-cell>
      <cr-calendar-grid-cell>Inside cell 4</cr-calendar-grid-cell>
    </cr-calendar-grid-row>
    <pre>
      <code>
        &lt;cr-calendar-grid-row&gt;
          &lt;cr-calendar-grid-label&gt;Inside a label&lt;/cr-calendar-grid-label&gt;
          &lt;cr-calendar-grid-cell&gt;Inside cell 1&lt;/cr-calendar-grid-cell&gt;
          &lt;cr-calendar-grid-cell&gt;Inside cell 2&lt;/cr-calendar-grid-cell&gt;
          &lt;cr-calendar-grid-cell&gt;Inside cell 3&lt;/cr-calendar-grid-cell&gt;
          &lt;cr-calendar-grid-cell&gt;Inside cell 4&lt;/cr-calendar-grid-cell&gt;
        &lt;/cr-calendar-grid-row&gt;
      </code>
    </pre>

    <h4>Row Label Cells Dynamic</h4>
    <cr-calendar-grid-row>
      <cr-calendar-grid-label>label then loop cells</cr-calendar-grid-label>
      <cr-calendar-grid-cell *ngFor="let cell of cells">
        {{cell}}
      </cr-calendar-grid-cell>
    </cr-calendar-grid-row>
    <pre>
      <code>
        &lt;cr-calendar-grid-row&gt;
          &lt;cr-calendar-grid-label&gt;Label then loop cells&lt;/cr-calendar-grid-label&gt;
          &lt;cr-calendar-grid-cell *ngFor="let cell of cells"&gt;
          &#9;&#123;cell&#125;
          &lt;/cr-calendar-grid-cell&gt;
        &lt;/cr-calendar-grid-row&gt;
      </code>
    </pre>
  `,
  styles: [`
    h4 {
      margin-top: 2rem;
    }
    pre {
      background-color: #d2d2d2;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartsComponent implements OnInit {

  cells = ['one', 'two', 'three', 'four'];

  constructor() { }

  ngOnInit() {
  }

}
