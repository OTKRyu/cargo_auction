import Cargo from "./cargo";
import Bid from "./bid";

interface Auction {
  auctionId: number;
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
  startAuction(): void;
  endAuction(): void;
}

export default Auction;
