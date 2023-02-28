import Account from "./account";
import Cargo from "./cargo";
import Auction from "./auction";

interface Owner {
  id: number;
  userName: string;
  account: Account;
  createCargo(
    id: number,
    name: string,
    category: string,
    transportDueDate: string,
    description: string | undefined
  ): Cargo;
  createAuction(
    id: number,
    cargo: Cargo,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ): Auction;
  payTransportFee(auction: Auction, truckerAccount: Account): boolean;
  changeCargoStatus(cargo: Cargo): boolean;
}

export default Owner;
