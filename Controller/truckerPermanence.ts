import Trucker from "../Entity/trucker";

interface TruckerPermanence {
  getTrucker(truckerId: number): Trucker;
  getTruckers(truckerId: number): Array<Trucker>;
  getNewTruckerId(): number;
  saveTrucker(trucker: Trucker): boolean;
  fetchTrucker(trucker: Trucker): boolean;
}

export default TruckerPermanence;
