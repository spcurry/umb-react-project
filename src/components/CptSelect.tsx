import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CptCode from '../models/CptCode';
import { CptCodeService } from '../CptCodeService';

type Props = {
  selectedCptCode: CptCode | undefined;
  onCptCodeChanged: (newCode: CptCode | undefined) => void;
}

const CptSelect = (props: Props) => {
  // Note: Storing the list of cptCodes here, since no other component needs the full list
  const [cptCodes, setCptCodes] = useState<CptCode[]>([]);

  // Load the list of available CPT Codes
  useEffect(() => {
    CptCodeService.getCptCodes().then((result) => {
      setCptCodes(result);
    });
  }, []);

  // Event handler for when the user changes the selected code
  const handleCodeIdChanged = (event: SelectChangeEvent) => {
    const numVal = parseInt(event.target.value);
    if (!isNaN(numVal)) {
      const cptCode = cptCodes.find((c) => c.id === numVal);
      if (cptCode) {
        props.onCptCodeChanged(cptCode);
      } else {
        props.onCptCodeChanged(undefined);
      }
    }
  };

  // Build array of select options to display
  const codeOptions = cptCodes.map((code) => {
    return <MenuItem key={'key_' + code.id} value={code.id}>{code.code}</MenuItem>
  });

  return (
    <FormControl fullWidth style={{ maxWidth: '14rem'}}>
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
