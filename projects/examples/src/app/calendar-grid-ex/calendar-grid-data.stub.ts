import { CalendarGridCell, CalendarGridRow, CalendarGridData } from '../../../../crangular/src/lib/calendar-grid/calendar-grid';

export const strCells = (): CalendarGridCell<string>[] => {
  return [
    {id: 'A', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: 'one'},
    {id: 'A', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: 'two'},
    {id: 'A', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: 'three'},
    {id: 'A', date: new Date(2019, 9, 4, 0, 0, 0, 0), value: 'four'},
    {id: 'A', date: new Date(2019, 9, 5, 0, 0, 0, 0), value: 'five'},
    {id: 'A', date: new Date(2019, 9, 6, 0, 0, 0, 0), value: 'siv'},
    {id: 'A', date: new Date(2019, 9, 7, 0, 0, 0, 0), value: 'seven'},
    {id: 'A', date: new Date(2019, 9, 8, 0, 0, 0, 0), value: 'six'},
    {id: 'A', date: new Date(2019, 9, 9, 0, 0, 0, 0), value: 'fiv'},
    {id: 'A', date: new Date(2019, 9, 10, 0, 0, 0, 0), value: 'four'},
    {id: 'A', date: new Date(2019, 9, 11, 0, 0, 0, 0), value: 'three'}
  ];
};

export const numCells = (): CalendarGridCell<number>[] => {
  return [
    {id: 'B', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: 4},
    {id: 'B', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: 5},
    {id: 'B', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: 6},
    {id: 'B', date: new Date(2019, 9, 4, 0, 0, 0, 0), value: 5},
    {id: 'B', date: new Date(2019, 9, 5, 0, 0, 0, 0), value: 5},
    {id: 'B', date: new Date(2019, 9, 6, 0, 0, 0, 0), value: 6},
    {id: 'B', date: new Date(2019, 9, 7, 0, 0, 0, 0), value: 7},
    {id: 'B', date: new Date(2019, 9, 8, 0, 0, 0, 0), value: 6},
    {id: 'B', date: new Date(2019, 9, 9, 0, 0, 0, 0), value: 5},
    {id: 'B', date: new Date(2019, 9, 10, 0, 0, 0, 0), value: 4},
    {id: 'B', date: new Date(2019, 9, 11, 0, 0, 0, 0), value: 3}
  ];
};

export const boolCells = (): CalendarGridCell<boolean>[] => {
  return [
    {id: 'C', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: true},
    {id: 'C', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: false},
    {id: 'C', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: false},
    {id: 'C', date: new Date(2019, 9, 4, 0, 0, 0, 0), value: true},
    {id: 'C', date: new Date(2019, 9, 5, 0, 0, 0, 0), value: true},
    {id: 'C', date: new Date(2019, 9, 6, 0, 0, 0, 0), value: false},
    {id: 'C', date: new Date(2019, 9, 7, 0, 0, 0, 0), value: true},
    {id: 'C', date: new Date(2019, 9, 8, 0, 0, 0, 0), value: true},
    {id: 'C', date: new Date(2019, 9, 9, 0, 0, 0, 0), value: false},
    {id: 'C', date: new Date(2019, 9, 10, 0, 0, 0, 0), value: true},
    {id: 'C', date: new Date(2019, 9, 11, 0, 0, 0, 0), value: false}
  ];
}

export const calendarGridRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Row 1',
      cells: strCells(),
      nodes: undefined
    },
    {
      label: 'Row 2',
      cells: numCells(),
      nodes: undefined
    },
    {
      label: 'Row 3',
      cells: boolCells(),
      nodes: undefined
    }
  ];
};

export const calendarGridSingleNestRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Row 1',
      cells: strCells(),
      nodes: [{
        label: 'Sub 1 a',
        cells: numCells(),
        nodes: undefined
      }]
    },
    {
      label: 'Row 2',
      cells: numCells(),
      nodes: [{
        label: 'Sub 2 a',
        cells: boolCells(),
        nodes: undefined
      }]
    },
    {
      label: 'Row 3',
      cells: boolCells(),
      nodes: [{
        label: 'Sub 3 a',
        cells: strCells(),
        nodes: undefined
      }]
    }
  ];
};

export const calendarGridDoubleNestRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Row 1',
      cells: strCells(),
      nodes: [{
        label: 'Sub 1 a',
        cells: numCells(),
        nodes: [{
          label: 'Sub Sub 1 a 1',
          cells: boolCells(),
          nodes: undefined
        }]
      }]
    },
    {
      label: 'Row 2',
      cells: strCells(),
      nodes: [{
        label: 'Sub 2 a',
        cells: numCells(),
        nodes: [{
          label: 'Sub Sub 2 a 1',
          cells: boolCells(),
          nodes: undefined
        }]
      }]
    },
    {
      label: 'Row 3',
      cells: strCells(),
      nodes: [{
        label: 'Sub 3 a',
        cells: numCells(),
        nodes: [{
          label: 'Sub Sub 3 a 1',
          cells: boolCells(),
          nodes: undefined
        }]
      }]
    }
  ];
};
