import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FakerServerInput } from './FakerServer';

const App = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [radioBtnValue, setRadioBtnValue] = useState('All');
  const [columnDefs] = useState([
    {
      field: 'country',
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: [],
      },
      cellEditorPopup: true,
      editable: true,
    },
  ]);

  const setNameCellEditorValues = (values) => {
    const colDefs = gridRef.current.api.getColumnDefs();

    colDefs[0].cellEditorParams.values = values;
    gridRef.current.api.setColumnDefs(colDefs);
  };

  useEffect(() => {
    FakerServerInput.fetchCountries(radioBtnValue).then((res) => {
      const data = res.map((country) => {
        return { country: country };
      });
      setRowData(data);

      setNameCellEditorValues(res);
    });
  }, [radioBtnValue]);

  const onValueChanged = (e) => {
    const { value } = e.target;

    setRadioBtnValue(value);
  };

  const CONTINENTS = ['All', 'African', 'European'];

  return (
    <div>
      <div>
        <h3>Continets to filter through:</h3>
        {CONTINENTS.map((continent, i) => (
          <div key={continent}>
            <input
              type='radio'
              name='country'
              value={continent}
              onChange={onValueChanged}
            />
            <label htmlFor={continent}>{continent} Countries</label>
          </div>
        ))}
      </div>

      <div className='ag-theme-alpine' style={{ width: 500, height: 500 }}>
        <AgGridReact ref={gridRef} rowData={rowData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default App;
