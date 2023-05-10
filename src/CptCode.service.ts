import CptCode from './models/CptCode';

export const CptCodeService = {
  async getCptCodes(): Promise<CptCode[]> {
    const response = await fetch('http://localhost:3001/api/cptCodes');
    const jsonData = await response.json();
    return jsonData;
  }
};
