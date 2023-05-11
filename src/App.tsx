import { useState } from 'react';
import './App.css'
import CptSelect from './components/CptSelect';
import CptDetails from './components/CptDetails';
import AddCost from './components/AddCost';
import CptCode from './models/CptCode';
import { CptCodeService } from './CptCodeService';
import { Cost } from './models/Cost';

const App = () => {
  const [selectedCptCode, setSelectedCptCode] = useState<CptCode | undefined>();
  const [selectedAverageCost, setSelectedAverageCost] = useState<number | undefined>();

  const calculateAndSetAverageCost = (cptCode: CptCode | undefined) => {
    if (cptCode !== undefined) {
      CptCodeService.getCptCodeCosts(cptCode.id).then((costs: Cost[]) => {
        const costsSum = costs.reduce((accumulator, c) => accumulator + c.cost, 0);
        const costsAverage = costsSum / costs.length;
        if (!isNaN(costsAverage)) {
          setSelectedAverageCost(costsAverage);
        } else {
          setSelectedAverageCost(undefined);
        }
      });
    } else {
      setSelectedAverageCost(undefined);
    }
  }

  const handleNewCostAdded = () => {
    calculateAndSetAverageCost(selectedCptCode);
  };

  const handleCptCodeChanged = (newCptCode: CptCode | undefined) => {
    setSelectedCptCode(newCptCode);
    calculateAndSetAverageCost(newCptCode);
  };

  return (
    <>
      <div>
        <a href="https://healthcare.utah.edu/" target="_blank" rel="noreferrer">
          <img src="https://healthcare.utah.edu/themes/custom/theme_uou_clinical/logo.svg" className="logo uhealth" alt="UHealth logo" />
        </a>
      </div>
      <h1>UMB React Project</h1>
      <div className="card">
        <div className="d-flex flex-column align-items-center">
          <CptSelect selectedCptCode={selectedCptCode}
                     onCptCodeChanged={handleCptCodeChanged}></CptSelect>
          <br/>
          <CptDetails selectedCptCode={selectedCptCode}
                      selectedAverageCost={selectedAverageCost}></CptDetails>
          <br/>
          <AddCost selectedCptCode={selectedCptCode}
                   onNewCostAdded={handleNewCostAdded}></AddCost>
        </div>
      </div>
    </>
  )
}

export default App
