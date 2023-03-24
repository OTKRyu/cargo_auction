import Auction from "./auction";
import Account from "./account";
import Cargo from "./cargo";

interface Trucker {
  id: number;
  userName: string;
  account: Account;
  participateAuction(auction: Auction, transportFee: number): boolean;
  eraseLatestAuctionBid(auction: Auction): boolean;
  changeCargoStatus(cargo: Cargo): boolean;
}

export default Trucker;
