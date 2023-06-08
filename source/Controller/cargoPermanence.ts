import Cargo from "../entity/cargo";

interface CargoPermanence {
  getCargo(cargoId: number): Promise<Cargo>;
  getNewCargoId(): Promise<number>;
  saveCargo(cargo: Cargo): Promise<void>;
  fetchCargo(cargo: Cargo): Promise<void>;
}

export default CargoPermanence;
