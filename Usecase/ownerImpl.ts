import Owner from "../Entity/owner";
import Cargo from "../Entity/cargo";
import { Auction } from "../Entity/auction";
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
    transferDueDate: string,
    description: string | undefined
  ) {
    return new Cargo(id, name, category, transferDueDate, description, this.id);
  }

  createAuction(
    id: number,
    cargoId: number,
    auctionExpireDate: string,
    auctionStartDate: string,
    transferFeeUpperLimit: number
  ) {
    return new Auction(
      id,
      cargoId,
      this.id,
      auctionExpireDate,
      auctionStartDate,
      transferFeeUpperLimit
    );
  }

  payTransportFee(auction: Auction, truckerAccount: Account) {
    let minimum: number = Infinity;
    minimum = auction.auctionHistory.reduce((accumulater, currentBid) => {
      if (accumulater <= currentBid.transferFee) {
        return accumulater;
      } else {
        return currentBid.transferFee;
      }
    }, minimum);
    this.account.withdraw(minimum);
    truckerAccount.deposit(minimum);
  }

  changeCargoStatus(cargo: Cargo) {
    if (cargo.status === "progress") {
      cargo.status = "arrived";
    }
    return cargo;
  }
}

export default OwnerImpl;
