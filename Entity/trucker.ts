import Auction from "./auction";
import Bid from "./bid";
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
