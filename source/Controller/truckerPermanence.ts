import Trucker from "../Entity/trucker";

interface TruckerPermanence {
  getTrucker(truckerId: number): Promise<Trucker>;
  getNewTruckerId(): Promise<number>;
  saveTrucker(trucker: Trucker): Promise<void>;
  fetchTrucker(trucker: Trucker): Promise<void>;
}

export default TruckerPermanence;
