import Auction from "./auction";
import Account from "./account";
import Cargo from "./cargo";

interface Trucker {
  id: number;
  userName: string;
  account: Account;
  participateAuction(
    auction: Auction,
    bidId: number,
    transportFee: number
  ): boolean;
  changeCargoStatus(cargo: Cargo): boolean;
}

export default Trucker;
