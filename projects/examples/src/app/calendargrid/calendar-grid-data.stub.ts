import { CalendarGridCell, CalendarGridRow, CalendarGridData } from '../../../../crangular/src/lib/calendargrid/calendargrid';

export const strCells = (): CalendarGridCell<string>[] => {
  return [
    {id: 'A', date: new Date(2019, 9, 1, 0, 0, 0, 0), value: '1'},
    {id: 'A', date: new Date(2019, 9, 2, 0, 0, 0, 0), value: '2'},
    {id: 'A', date: new Date(2019, 9, 3, 0, 0, 0, 0), value: '3'},
    {id: 'A', date: new Date(2019, 9, 4, 0, 0, 0, 0), value: '4'},
    {id: 'A', date: new Date(2019, 9, 5, 0, 0, 0, 0), value: '5'},
    {id: 'A', date: new Date(2019, 9, 6, 0, 0, 0, 0), value: '6'},
    {id: 'A', date: new Date(2019, 9, 7, 0, 0, 0, 0), value: '7'},
    {id: 'A', date: new Date(2019, 9, 8, 0, 0, 0, 0), value: '6'},
    {id: 'A', date: new Date(2019, 9, 9, 0, 0, 0, 0), value: '5'},
    {id: 'A', date: new Date(2019, 9, 10, 0, 0, 0, 0), value: '4'},
    {id: 'A', date: new Date(2019, 9, 11, 0, 0, 0, 0), value: '3'}
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
      node: undefined
    },
    {
      label: 'Row2',
      cells: numCells(),
      node: undefined
    },
    {
      label: 'Row3',
      cells: boolCells(),
      node: undefined
    }
  ];
};

export const calendarGridData = (): CalendarGridData => {
  return {
    rows: calendarGridRows()
  };
};

export const calendarGridSingleNestRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Row 1',
      cells: strCells(),
      node: {
        label: 'Sub 1 a',
        cells: numCells(),
        node: undefined
      }
    },
    {
      label: 'Row 2',
      cells: numCells(),
      node: {
        label: 'Sub 2 a',
        cells: boolCells(),
        node: undefined
      }
    },
    {
      label: 'Row 3',
      cells: boolCells(),
      node: {
        label: 'Sub 3 a',
        cells: strCells(),
        node: undefined
      }
    }
  ];
};

export const calendarGridNestedData = (): CalendarGridData => {
  return {
    rows: calendarGridSingleNestRows()
  };
};

export const calendarGridDoubleNestRows = (): CalendarGridRow<any>[] => {
  return [
    {
      label: 'Row 1',
      cells: strCells(),
      node: {
        label: 'Sub 1 a',
        cells: numCells(),
        node: {
          label: 'Sub Sub 1 a 1',
          cells: boolCells(),
          node: undefined
        }
      }
    },
    {
      label: 'Row 2',
      cells: strCells(),
      node: {
        label: 'Sub 2 a',
        cells: numCells(),
        node: {
          label: 'Sub Sub 2 a 1',
          cells: boolCells(),
          node: undefined
        }
      }
    },
    {
      label: 'Row 3',
      cells: strCells(),
      node: {
        label: 'Sub 3 a',
        cells: numCells(),
        node: {
          label: 'Sub Sub 3 a 1',
          cells: boolCells(),
          node: undefined
        }
      }
    }
  ];
};

export const calendarGridDoubleNestedData = (): CalendarGridData => {
  return {
    rows: calendarGridDoubleNestRows()
  };
};
