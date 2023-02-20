import { Auction, Bid } from "./auction";
import Account from "./account";
import Cargo from "./cargo";

interface Trucker {
  id: number;
  userName: string;
  account: Account;
  participateAuction(auction: Auction, bid: Bid): boolean;
  changeCargoStatus(cargo: Cargo): boolean;
}

export default Trucker;
