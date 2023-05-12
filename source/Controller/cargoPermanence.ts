import Cargo from "../Entity/cargo";

interface CargoPermanence {
  getCargo(cargoId: number): Cargo;
  getCargos(): Array<Cargo>;
  getNewCargoId(): number;
  saveCargo(cargo: Cargo): void;
  fetchCargo(cargo: Cargo): void;
}

export default CargoPermanence;
