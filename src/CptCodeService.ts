import CptCode from './models/CptCode';
import { Cost } from './models/Cost';

export const CptCodeService = {
  async getCptCodes(): Promise<CptCode[]> {
    const response = await fetch('http://localhost:3001/api/cptCodes');
    if (response.ok === true) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  },

  async addCost(newCost: Cost) {
    const response = await fetch(`http://localhost:3001/api/costs`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        cptCodeId: newCost.cptCodeId,
        cost: newCost.cost,
        facilityType: newCost.facilityType,
        copay: newCost.copay
      })
    });
    if (response.ok === true) {
      return;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  },

  async getCptCodeCosts(cptCodeId: number): Promise<Cost[]> {
    const response = await fetch(`http://localhost:3001/api/cptCodes/${cptCodeId}/costs`);
    if (response.ok === true) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  }
};
