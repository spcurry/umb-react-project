import CptCode from '../models/CptCode';
import { Card, CardContent, Typography } from '@mui/material';

type Props = {
  selectedCptCode: CptCode | undefined;
  selectedAverageCost: number | undefined;
}
const CptDetails = (props: Props) => {
  if (props.selectedCptCode) {
    return (
      <Card sx={{ minWidth: 275, maxWidth: 500 }} >
        <CardContent>
          <Typography variant="h6">
            CPT Code Details
          </Typography>
          <div>
            <b>Average Cost: </b>${props.selectedAverageCost}
          </div>
          <div>
            <b>Code Description: </b>{props.selectedCptCode.description}
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return <></>;
  }
}

export default CptDetails;