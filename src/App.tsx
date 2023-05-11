import { useEffect, useState } from 'react';
import './App.css'
import CptSelect from './components/CptSelect';
import AverageCost from './components/AverageCost';
import NewCostForm from './components/NewCostForm';
import CptCode from './models/CptCode';
import { CptCodeService } from './CptCode.service';

const App = () => {
  const [selectedCptCode, setSelectedCptCode] = useState<CptCode | undefined>();
  const [cptCodes, setCptCodes] = useState<CptCode[]>([]);

  // Load the list of available CPT Codes
  useEffect(() => {
    CptCodeService.getCptCodes().then((result) => {
      setCptCodes(result);
    });
  }, []);

  const handleNewCostAdded = () => {
    // TODO Have Average cost recalculate the average
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
        <CptSelect cptCodes={cptCodes}
                   selectedCptCode={selectedCptCode}
                   onCptCodeChanged={setSelectedCptCode}></CptSelect>
        <AverageCost selectedCptCode={selectedCptCode}></AverageCost>
        <NewCostForm selectedCptCode={selectedCptCode}
                     onNewCostAdded={handleNewCostAdded}></NewCostForm>
      </div>
      <p className="read-the-docs">
        Check the README to get started!
      </p>
    </>
  )
}

export default App
