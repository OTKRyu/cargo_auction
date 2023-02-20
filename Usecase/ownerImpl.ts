import Owner from "../Entity/owner";
import Cargo from "../Entity/cargo";
import { Auction, Bid } from "../Entity/auction";
import Account from "../Entity/account";

class OwnerImpl implements Owner {
  id: number;
  userName: string;
  account: Account;

  constructor(id: number, userName: string, account: Account) {
    this.id = id;
    this.userName = userName;
    this.account = account;
  }

  createCargo(
    id: number,
    name: string,
    category: string,
    transportDueDate: string,
    description: string | undefined
  ) {
    return new Cargo(
      id,
      name,
      category,
      transportDueDate,
      description,
      this.id
    );
  }

  createAuction(
    id: number,
    cargoId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ) {
    return new Auction(
      id,
      cargoId,
      this.id,
      auctionExpireDate,
      auctionStartDate,
      transportFeeUpperLimit
    );
  }

  payTransportFee(auction: Auction, truckerAccount: Account) {
    if (auction.status !== "done") {
      return false;
    }

    let minimumBid: Bid | undefined;
    minimumBid = auction.findMinimumBid();
    if (minimumBid === undefined) {
      return false;
    }
    this.account.withdraw(minimumBid.transportFee);
    truckerAccount.deposit(minimumBid.transportFee);
    return true;
  }

  changeCargoStatus(cargo: Cargo) {
    if (cargo.ownerId === this.id && cargo.status === "progress") {
      cargo.status = "arrived";
      return true;
    }
    return false;
  }
}

export default OwnerImpl;
