import Account from "./account";
import Cargo from "./cargo";
import { Auction } from "./auction";

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
    cargoId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ): Auction;
  payTransportFee(auction: Auction, truckerAccount: Account): string;
  changeCargoStatus(cargo: Cargo): string;
}

export default Owner;
