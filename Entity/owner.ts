import Account from "./account";
import Cargo from "./cargo";
import Auction from "./auction";
import Trucker from "./trucker";

interface Owner {
  ownerId: number;
  userName: string;
  account: Account;
  registerCargo(
    cargoId: number,
    name: string,
    transportDueDate: string,
    description: string | undefined
  ): Cargo;
  createAuction(
    auctionId: number,
    cargo: Cargo,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ): Auction;
  payTransportFee(auction: Auction, trucker: Trucker): boolean;
  changeCargoStatus(cargo: Cargo): boolean;
}

export default Owner;
