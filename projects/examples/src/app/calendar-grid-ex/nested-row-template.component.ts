import { CalendarGridData } from '../../../../crangular/src/lib/calendar-grid/calendar-grid';
import { calendarGridDoubleNestRows, calendarGridRows, calendarGridSingleNestRows } from './calendar-grid-data.stub';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cr-nested-row-template',
  template: `
    <h3>Nested row/template</h3>

    <h3>Single row, single nest</h3>
    <h4>Single Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
      <!-- Parent -->
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛏️ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🧳 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <h4>Double Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <!-- Parent -->
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛏️ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🧳 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>
    </cr-calendar-grid>
    
    <pre>
      <code>
        &lt;cr-calendar-grid [calendarGridData]="calendarGridNestedData"&gt;
          &lt;!-- Parent --&gt;
          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;🏷️&#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🏨 &#123; c?.value &#125;&lt;/ng-template&gt;
            
            &lt;!-- Child --&gt;
            &lt;cr-calendar-grid-row&gt;
              &lt;ng-template crCalendarGridLabel let-l="label"&gt;🛏️&#123; l &#125;&lt;/ng-template&gt;
              &lt;ng-template crCalendarGridCell let-c="cell"&gt;🧳 &#123; c?.value &#125;&lt;/ng-template&gt;
            &lt;/cr-calendar-grid-row&gt;
          &lt;/cr-calendar-grid-row&gt;
        &lt;/cr-calendar-grid&gt;
      </code>
    </pre>

    <h3>Single row, multi nest</h3>
    <h4>Double Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <!-- Parent -->
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛏️ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🧳 {{ c?.value }}
          </ng-template>
          <!-- Grandchild -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">
              🏊 {{ l }}
            </ng-template>
            <ng-template crCalendarGridCell let-c="cell">
              ⚪ {{ c?.value }}
            </ng-template>
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>
    </cr-calendar-grid>
    
    <pre>
      <code>
        &lt;cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData"&gt;
          &lt;!-- Parent --&gt;
          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;🏷️&#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🏨 &#123; c?.value &#125;&lt;/ng-template&gt;
            
            &lt;!-- Child --&gt;
            &lt;cr-calendar-grid-row&gt;
              &lt;ng-template crCalendarGridLabel let-l="label"&gt;🛏️&#123; l &#125;&lt;/ng-template&gt;
              &lt;ng-template crCalendarGridCell let-c="cell"&gt;🧳 &#123; c?.value &#125;&lt;/ng-template&gt;
              
              &lt;!-- Grandchild --&gt;
              &lt;cr-calendar-grid-row&gt;
                &lt;ng-template crCalendarGridLabel let-l="label"&gt;🏊 &#123; l &#125;&lt;/ng-template&gt;
                &lt;ng-template crCalendarGridCell let-c="cell"&gt;⚪ &#123; c?.value &#125;&lt;/ng-template&gt;
              &lt;/cr-calendar-grid-row&gt;
            &lt;/cr-calendar-grid-row&gt;
          &lt;/cr-calendar-grid-row&gt;
        &lt;/cr-calendar-grid&gt;
      </code>
    </pre>

    <h3>Multi row, single nest</h3>
    <h4>Single Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛏️ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🧳 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🔖 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🚐‍ {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🎫 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            ⚽ {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          📜 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🛫 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛂 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🏢 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <h4>Double Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛏️ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🧳 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🔖 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🚐‍ {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🎫 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            ⚽ {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          📜 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🛫 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛂 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🏢 {{ c?.value }}
          </ng-template>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>
    </cr-calendar-grid>

    <pre>
      <code>
        &lt;cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData"&gt;
          &lt;!-- Parent --&gt;
          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;🏷️ &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🏨 &#123; c?.value &#125;&lt;/ng-template&gt;
            
            &lt;!-- Child --&gt;
            &lt;cr-calendar-grid-row&gt;
              &lt;ng-template crCalendarGridLabel let-l="label"&gt;🛏️ &#123; l &#125;&lt;/ng-template&gt;
              &lt;ng-template crCalendarGridCell let-c="cell"&gt;🧳 &#123; c?.value &#125;&lt;/ng-template&gt;
            &lt;/cr-calendar-grid-row&gt;
          &lt;/cr-calendar-grid-row&gt;

          &lt;!-- Parent --&gt;
          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;🔖 &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🚐‍ &#123; c?.value &#125;&lt;/ng-template&gt;
            
            &lt;!-- Child --&gt;
            &lt;cr-calendar-grid-row&gt;
              &lt;ng-template crCalendarGridLabel let-l="label"&gt;🎫 &#123; l &#125;&lt;/ng-template&gt;
              &lt;ng-template crCalendarGridCell let-c="cell"&gt;⚽ &#123; c?.value &#125;&lt;/ng-template&gt;
            &lt;/cr-calendar-grid-row&gt;
          &lt;/cr-calendar-grid-row&gt;

          &lt;!-- Parent --&gt;
          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;📜 &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🛫 &#123; c?.value &#125;&lt;/ng-template&gt;
            
            &lt;!-- Child --&gt;
            &lt;cr-calendar-grid-row&gt;
              &lt;ng-template crCalendarGridLabel let-l="label"&gt;🛂 &#123; l &#125;&lt;/ng-template&gt;
              &lt;ng-template crCalendarGridCell let-c="cell"&gt;🏢 &#123; c?.value &#125;&lt;/ng-template&gt;
            &lt;/cr-calendar-grid-row&gt;
          &lt;/cr-calendar-grid-row&gt;
        &lt;/cr-calendar-grid&gt;
      </code>
    </pre>

    <h3>Multi row, multi nest</h3>    
    <h4>Double Nested Data</h4>
    <cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData">
      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🏷️ {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🏨 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛏️ {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🧳 {{ c?.value }}
          </ng-template>
          <!-- Grandchild -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">
              📞 {{ l }}
            </ng-template>
            <ng-template crCalendarGridCell let-c="cell">
              📶‍ {{ c?.value }}
            </ng-template>
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          🔖 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🚐‍ {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🎫 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            ⚽ {{ c?.value }}
          </ng-template>
          <!-- Grandchild -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">
              📅 {{ l }}
            </ng-template>
            <ng-template crCalendarGridCell let-c="cell">
              🧭 {{ c?.value }}
            </ng-template>
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>

      <cr-calendar-grid-row>
        <ng-template crCalendarGridLabel let-l="label">
          📜 {{ l }}
        </ng-template>
        <ng-template crCalendarGridCell let-c="cell">
          🛫 {{ c?.value }}
        </ng-template>
        <!-- Child -->
        <cr-calendar-grid-row>
          <ng-template crCalendarGridLabel let-l="label">
            🛂 {{ l }}
          </ng-template>
          <ng-template crCalendarGridCell let-c="cell">
            🏢 {{ c?.value }}
          </ng-template>
          <!-- Grandchild -->
          <cr-calendar-grid-row>
            <ng-template crCalendarGridLabel let-l="label">
              🖊️ {{ l }}
            </ng-template>
            <ng-template crCalendarGridCell let-c="cell">
              🔲 {{ c?.value }}
            </ng-template>
          </cr-calendar-grid-row>
        </cr-calendar-grid-row>
      </cr-calendar-grid-row>
    </cr-calendar-grid>
    
    <pre>
      <code>
        &lt;cr-calendar-grid [calendarGridData]="calendarGridDoubleNestedData"&gt;
          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;🏷️ &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🏨 &#123; c?.value &#125;&lt;/ng-template&gt;
            
            &lt;!-- Child --&gt;
            &lt;cr-calendar-grid-row&gt;
              &lt;ng-template crCalendarGridLabel let-l="label"&gt;🛏️ &#123; l &#125;&lt;/ng-template&gt;
              &lt;ng-template crCalendarGridCell let-c="cell"&gt;🧳 &#123; c?.value &#125;&lt;/ng-template&gt;
            
              &lt;!-- Grandchild --&gt;
              &lt;cr-calendar-grid-row&gt;
                &lt;ng-template crCalendarGridLabel let-l="label"&gt;📞 &#123; l &#125;&lt;/ng-template&gt;
                &lt;ng-template crCalendarGridCell let-c="cell"&gt;📶‍ &#123; c?.value &#125;&lt;/ng-template&gt;
              &lt;/cr-calendar-grid-row&gt;
            &lt;/cr-calendar-grid-row&gt;
          &lt;/cr-calendar-grid-row&gt;

          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;🔖 &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🚐‍ &#123; c?.value &#125;&lt;/ng-template&gt;
            
            &lt;!-- Child --&gt;
            &lt;cr-calendar-grid-row&gt;
              &lt;ng-template crCalendarGridLabel let-l="label"&gt;🎫 &#123; l &#125;&lt;/ng-template&gt;
              &lt;ng-template crCalendarGridCell let-c="cell"&gt;⚽ &#123; c?.value &#125;&lt;/ng-template&gt;
            
              &lt;!-- Grandchild --&gt;
              &lt;cr-calendar-grid-row&gt;
                &lt;ng-template crCalendarGridLabel let-l="label"&gt;📅 &#123; l &#125;&lt;/ng-template&gt;
                &lt;ng-template crCalendarGridCell let-c="cell"&gt;🧭 &#123; c?.value &#125;&lt;/ng-template&gt;
              &lt;/cr-calendar-grid-row&gt;
            &lt;/cr-calendar-grid-row&gt;
          &lt;/cr-calendar-grid-row&gt;

          &lt;cr-calendar-grid-row&gt;
            &lt;ng-template crCalendarGridLabel let-l="label"&gt;📜 &#123; l &#125;&lt;/ng-template&gt;
            &lt;ng-template crCalendarGridCell let-c="cell"&gt;🛫 &#123; c?.value &#125;&lt;/ng-template&gt;
            
            &lt;!-- Child --&gt;
            &lt;cr-calendar-grid-row&gt;
              &lt;ng-template crCalendarGridLabel let-l="label"&gt;🛂 &#123; l &#125;&lt;/ng-template&gt;
              &lt;ng-template crCalendarGridCell let-c="cell"&gt;🏢 &#123; c?.value &#125;&lt;/ng-template&gt;
            
              &lt;!-- Grandchild --&gt;
              &lt;cr-calendar-grid-row&gt;
                &lt;ng-template crCalendarGridLabel let-l="label"&gt;🖊️ &#123; l &#125;&lt;/ng-template&gt;
                &lt;ng-template crCalendarGridCell let-c="cell"&gt;🔲 &#123; c?.value &#125;&lt;/ng-template&gt;
              &lt;/cr-calendar-grid-row&gt;
            &lt;/cr-calendar-grid-row&gt;
          &lt;/cr-calendar-grid-row&gt;
        &lt;/cr-calendar-grid&gt;
      </code>
    </pre>
  `,
  styles: [`
    h3 {
      margin-top: 3rem;
    }
    h4 {
      margin-top: 2rem;
    }
    pre {
      background-color: #d2d2d2;
      margin-top: 2rem;
    }
`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedRowTemplateComponent {

  calendarGridData: CalendarGridData = new CalendarGridData(calendarGridRows());
  calendarGridNestedData: CalendarGridData = new CalendarGridData(calendarGridSingleNestRows());
  calendarGridDoubleNestedData: CalendarGridData = new CalendarGridData(calendarGridDoubleNestRows());

  constructor() { }
}
