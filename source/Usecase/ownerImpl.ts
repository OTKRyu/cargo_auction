import Owner from "../entity/owner";
import Cargo from "../entity/cargo";
import Account from "../entity/account";
import Auction from "../entity/auction";
import Trucker from "../entity/trucker";

import AuctionImpl from "./auctionImpl";

class OwnerImpl implements Owner {
  ownerId: number;
  userName: string;
  account: Account;

  constructor(ownerId: number, userName: string, account: Account) {
    this.ownerId = ownerId;
    this.userName = userName;
    this.account = account;
  }

  registerCargo(
    cargoId: number,
    name: string,
    transportDueDate: string,
    description: string | undefined
  ) {
    return new Cargo(
      cargoId,
      name,
      transportDueDate,
      description,
      this.ownerId,
      undefined,
      "todo"
    );
  }

  createAuction(
    auctionId: number,
    cargo: Cargo,
    auctionExpireDate: string,
    auctionStartDate: string,
    transportFeeUpperLimit: number
  ) {
    if (transportFeeUpperLimit > this.account.balance) {
      throw Error("Your balance isn't enough for making auction");
    }

    return new AuctionImpl(
      auctionId,
      cargo,
      this.ownerId,
      auctionExpireDate,
      auctionStartDate,
      transportFeeUpperLimit,
      []
    );
  }

  payTransportFee(auction: Auction, trucker: Trucker) {
    if (auction.status !== "done") {
      throw new Error("Your auction isn't done yet");
    }

    if (auction.determinedTruckerId === undefined) {
      throw new Error("Your auction doesn't have trucker");
    }

    let minimumTranportFee: number;
    minimumTranportFee = auction.findMinimumTransportFee();

    this.account.withdraw(minimumTranportFee);
    trucker.account.deposit(minimumTranportFee);
    return true;
  }

  changeCargoStatus(cargo: Cargo) {
    if (cargo.ownerId !== this.ownerId) {
      throw new Error("This cargo isn't yours");
    }

    if (cargo.status === "progress") {
      cargo.status = "arrived";
      return true;
    }

    throw new Error("Your cargo isn't in progress");
  }
}

export default OwnerImpl;
