import Trucker from "../Entity/trucker";

interface TruckerPermanence {
  getTrucker(truckerId: number): Trucker;
  getTruckers(): Array<Trucker>;
  getNewTruckerId(): number;
  saveTrucker(trucker: Trucker): void;
  fetchTrucker(trucker: Trucker): void;
}

export default TruckerPermanence;
