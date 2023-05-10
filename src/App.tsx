import './App.css'
import CptSelect from './components/CptSelect';
import AverageCost from './components/AverageCost';
import NewCostForm from './components/NewCostForm';

function App() {

  return (
    <>
      <div>
        <a href="https://healthcare.utah.edu/" target="_blank" rel="noreferrer">
          <img src="https://healthcare.utah.edu/themes/custom/theme_uou_clinical/logo.svg" className="logo uhealth" alt="UHealth logo" />
        </a>
      </div>
      <h1>UMB React Project</h1>
      <div className="card">
        <CptSelect></CptSelect>
        <AverageCost></AverageCost>
        <NewCostForm></NewCostForm>
      </div>
      <p className="read-the-docs">
        Check the README to get started!
      </p>
    </>
  )
}

export default App
