import { CalendarGridCell, CalendarGridRow, CalendarGridData } from '../../../../crangular/src/lib/calendar-grid/calendar-grid';

export const codes = (): string[] => {
  return ['1AZ3k', 'K33LN', 'Q993f', '965SL', 'VVCX1', '48XPY', 'TJH11']
}

export const prices = (): string[] => {
  return ['123.45', '99.75', '101.00', '74.95', '115.16', '89.99', '79.99']
}

export const quantities = (): number[] => {
  return [1, 22, 5, 0, 6, 17, 9]
}

export const strCells = (): CalendarGridCell<string>[] => {
  return [
    {label: 'A', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: 'one'},
    {label: 'A', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: 'two'},
    {label: 'A', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: 'three'},
    {label: 'A', date: new Date(2019, 9, 4, 0, 0, 0, 0), value: 'four'},
    {label: 'A', date: new Date(2019, 9, 5, 0, 0, 0, 0), value: 'five'},
    {label: 'A', date: new Date(2019, 9, 6, 0, 0, 0, 0), value: 'siv'},
    {label: 'A', date: new Date(2019, 9, 7, 0, 0, 0, 0), value: 'seven'}
  ];
};

export const numCells = (): CalendarGridCell<number>[] => {
  return [
    {label: 'B', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: 4},
    {label: 'B', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: 5},
    {label: 'B', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: 6},
    {label: 'B', date: new Date(2019, 9, 4, 0, 0, 0, 0), value: 5},
    {label: 'B', date: new Date(2019, 9, 5, 0, 0, 0, 0), value: 5},
    {label: 'B', date: new Date(2019, 9, 6, 0, 0, 0, 0), value: 6},
    {label: 'B', date: new Date(2019, 9, 7, 0, 0, 0, 0), value: 7}
  ];
};

export const boolCells = (): CalendarGridCell<boolean>[] => {
  return [
    {label: 'C', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: true},
    {label: 'C', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: false},
    {label: 'C', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: false},
    {label: 'C', date: new Date(2019, 9, 4, 0, 0, 0, 0), value: true},
    {label: 'C', date: new Date(2019, 9, 5, 0, 0, 0, 0), value: true},
    {label: 'C', date: new Date(2019, 9, 6, 0, 0, 0, 0), value: false},
    {label: 'C', date: new Date(2019, 9, 7, 0, 0, 0, 0), value: true}
  ];
}

export const calendarGridRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Parent Row 1',
      cells: strCells(),
      nodes: undefined
    },
    {
      label: 'Parent Row 2',
      cells: numCells(),
      nodes: undefined
    },
    {
      label: 'Parent Row 3',
      cells: boolCells(),
      nodes: undefined
    }
  ];
};

export const calendarGridSingleNestRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Parent Row 1',
      cells: strCells(),
      nodes: [{
        label: 'Child 1 (PR1)',
        cells: numCells(),
        nodes: undefined
      }]
    },
    {
      label: 'Parent Row 2',
      cells: numCells(),
      nodes: [{
        label: 'Child 1 (PR2)',
        cells: boolCells(),
        nodes: undefined
      }]
    },
    {
      label: 'Parent Row 3',
      cells: boolCells(),
      nodes: [{
        label: 'Child 1 (PR3)',
        cells: strCells(),
        nodes: undefined
      }]
    }
  ];
};

export const calendarGridDoubleNestRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Parent Row 1',
      cells: strCells(),
      nodes: [{
        label: 'Child 1 (PR1)',
        cells: numCells(),
        nodes: [{
          label: 'Grandchild 1 (PR1-C1)',
          cells: boolCells(),
          nodes: undefined
        }]
      }]
    },
    {
      label: 'Parent Row 2',
      cells: numCells(),
      nodes: [{
        label: 'Child 1 (PR2)',
        cells: boolCells(),
        nodes: [{
          label: 'Grandchild 1 (PR2-C1)',
          cells: strCells(),
          nodes: undefined
        }]
      }]
    },
    {
      label: 'Parent Row 3',
      cells: boolCells(),
      nodes: [{
        label: 'Child 1 (PR3)',
        cells: strCells(),
        nodes: [{
          label: 'Grandchild 1 (PR3-C1)',
          cells: numCells(),
          nodes: undefined
        }]
      }]
    }
  ];
};
