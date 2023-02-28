import Owner from "../Entity/owner";
import Cargo from "../Entity/cargo";
import Account from "../Entity/account";
import Auction from "../Entity/auction";

import AuctionImpl from "./auctionImpl";

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
    cargo: Cargo,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ) {
    return new AuctionImpl(
      id,
      cargo,
      this.id,
      auctionExpireDate,
      auctionStartDate,
      transportFeeUpperLimit
    );
  }

  payTransportFee(auction: Auction, truckerAccount: Account) {
    if (auction.status !== "done") {
      throw new Error("Your auction isn't done yet");
    }

    if (auction.determinedTruckerId === undefined) {
      throw new Error("Your auction doesn't have trucker");
    }

    let minimumTranportFee: number;
    minimumTranportFee = auction.findMinimumTransportFee();

    this.account.withdraw(minimumTranportFee);
    truckerAccount.deposit(minimumTranportFee);
    return true;
  }

  changeCargoStatus(cargo: Cargo) {
    if (cargo.ownerId === this.id && cargo.status === "progress") {
      cargo.status = "arrived";
      return true;
    }

    if (cargo.ownerId !== this.id) {
      throw new Error("This cargo isn't yours");
    }

    if (cargo.status !== "progress") {
      throw new Error("Your cargo isn't in progress");
    }

    throw new Error("Bad access to cargo");
  }
}

export default OwnerImpl;
