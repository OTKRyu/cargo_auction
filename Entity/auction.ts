type bid = {
  id: number;
  truckerId: number;
  transferFee: number;
};

type Auction = {
  id: number;
  cargoId: number;
  ownerid: number;
  auctionExpireDate: string;
  auctionStartDate: string;
  upperLimit: number;
  auction: Array<bid>;
  status: "todo" | "progress" | "done";
};

export default Auction;
