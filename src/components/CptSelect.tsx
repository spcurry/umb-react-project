import { Dispatch, SetStateAction } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CptCode from '../models/CptCode';

type Props = {
  cptCodes: CptCode[];
  selectedCptCode: CptCode | undefined;
  onCptCodeChanged: Dispatch<SetStateAction<CptCode | undefined>>;
}

const CptSelect = (props: Props) => {
  // Event handler for when the user changes the selected CPT code
  const handleCodeIdChanged = (event: SelectChangeEvent) => {
    const numVal = parseInt(event.target.value);
    if (!isNaN(numVal)) {
      const cptCode = props.cptCodes.find((c) => c.id === numVal);
      if (cptCode) {
        props.onCptCodeChanged(cptCode);
      } else {
        props.onCptCodeChanged(undefined);
      }
    }
  };

  // Build array of select options to display
  const codeOptions = props.cptCodes.map((code) => {
    return <MenuItem key={'key_' + code.id} value={code.id}>{code.code}</MenuItem>
  });

  return (
    <FormControl fullWidth>
      <InputLabel id="selected-code-label" >
        { props.selectedCptCode ? 'Selected CPT Code' : 'Select a CPT Code' }
      </InputLabel>
      <Select
        labelId="selected-code-label"
        id="selected-code"
        value={props.selectedCptCode ? props.selectedCptCode.id + '' : ''}
        label="Selected CPT Code"
        onChange={handleCodeIdChanged}
      >
        {codeOptions}
      </Select>
    </FormControl>
  );
}

export default CptSelect;
