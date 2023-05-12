import CptCode from '../models/CptCode';
import { ChangeEvent, useState } from 'react';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { CptCodeService } from '../CptCodeService';

type Props = {
  selectedCptCode: CptCode | undefined;
  onNewCostAdded: () => void;
}

const AddCost = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [cost, setCost] = useState<string>('');
  const [facilityType, setFacilityType] = useState<string>('');
  const [copay, setCopay] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleCostChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setCost(event.target.value);
  };
  const handleFacilityTypeChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setFacilityType(event.target.value);
  };
  const handleCopayChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setCopay(event.target.value);
  };

  const handleAddCost = () => {
    setErrorMsg('');

    let costNum: number;
    let copayNum = 0;

    // Ensure that the Cost input value is non-empty and a valid number
    if (cost.trim() === '') {
      setErrorMsg('Cost is required');
      return;
    } else {
      costNum = parseInt(cost);
      if (isNaN(costNum)) {
        setErrorMsg('Cost is not a valid number');
        return;
      }
    }

    // Copay isn't required - but if it's specified, make sure it's a valid number
    if (copay.trim() !== '') {
      const copayNum = parseInt(copay);
      if (isNaN(copayNum)) {
        setErrorMsg('Copay is not a valid number');
        return;
      }
    } else {
      copayNum = 0;
    }

    CptCodeService.addCost({
      cptCodeId: props.selectedCptCode!.id,
      cost: costNum,
      facilityType: facilityType,
      copay: copayNum
    }).then(() => {
        handleDialogClosed();
        props.onNewCostAdded();
      })
      .catch((err) => setErrorMsg(err.toString()));
  };

  const handleDialogOpened = () => {
    setCost('');
    setFacilityType('');
    setCopay('');
    setErrorMsg('');
    setDialogOpen(true);
  };

  const handleDialogClosed = () => {
    setDialogOpen(false);
  };

  if (props.selectedCptCode) {
    return (
      <div>
        <Button variant="contained" onClick={handleDialogOpened}>
          Add Cost
        </Button>
        <Dialog open={dialogOpen}
                onClose={handleDialogClosed}>
          <DialogTitle>Add Cost</DialogTitle>
          <DialogContent sx={{ maxWidth: '20rem'}}>
            <TextField
              autoFocus
              id="cost"
              label="Cost*"
              type="number"
              fullWidth
              variant="standard"
              value={cost}
              onChange={handleCostChanged}
            />
            <TextField
              id="facilityType"
              label="Facility Type"
              type="string"
              fullWidth
              variant="standard"
              value={facilityType}
              onChange={handleFacilityTypeChanged}
            />
            <TextField
              id="copay"
              label="Copay"
              type="number"
              fullWidth
              variant="standard"
              value={copay}
              onChange={handleCopayChanged}
            />
            <br />
            <div style={{ color: 'red' }}>{errorMsg}</div>
          </DialogContent>
          <DialogActions>
            <Button variant="contained"
                    color="secondary"
                    onClick={handleDialogClosed}>Cancel</Button>
            <Button variant="contained"
                    color="primary"
                    onClick={handleAddCost}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <></>;
  }
}

export default AddCost;