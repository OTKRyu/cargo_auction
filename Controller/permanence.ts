import Auction from "../Entity/auction";
import Cargo from "../Entity/cargo";
import Owner from "../Entity/owner";
import Trucker from "../Entity/trucker";

interface Permanence {
  getLatestOwnerId(): number;
  getLatestTruckerId(): number;
  getLatestCargoId(): number;
  getLatestAuctionId(): number;
  saveOwner(owner: Owner): boolean;
  saveTrucker(trucker: Trucker): boolean;
  saveCargo(cargo: Cargo): boolean;
  saveAuction(auction: Auction): boolean;
  fetchOwner(owner: Owner): boolean;
  fetchTrucker(trucker: Trucker): boolean;
  fetchCargo(cargo: Cargo): boolean;
  fetchAuction(auction: Auction): boolean;
}

export default Permanence;
