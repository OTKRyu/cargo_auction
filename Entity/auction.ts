import Cargo from "./cargo";
import Bid from "./bid";

interface Auction {
  id: number;
  cargo: Cargo;
  ownerId: number;
  auctionExpireDate: string;
  auctionStartDate: string;
  transportFeeUpperLimit: number;
  auctionHistory: Array<Bid>;
  determinedTruckerId: number | undefined;
  status: "todo" | "progress" | "done";
  findMinimumTransportFee(): number;
  addBid(bid: Bid): boolean;
  determineTrucker(): void;
}

export default Auction;
