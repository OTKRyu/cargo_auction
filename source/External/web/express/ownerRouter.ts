import express, { Request, Response } from "express";

import AccountImpl from "../../../usecase/accountImpl";

import OwnerCreateController from "../../../controller/ownerCreateController";
import OwnerController from "../../../controller/ownerController";

import OwnerPermanenceImpl from "../../permanence/mysql/implements/ownerPermanenceImpl";
import AccountPermanenceImpl from "../../permanence/mysql/implements/accountPermanenceImpl";
import CargoPermanenceImpl from "../../permanence/mysql/implements/cargoPermanenceImpl";
import TruckerPermanenceImpl from "../../permanence/mysql/implements/truckerPermanenceImpl";
import AuctionPermanenceImpl from "../../permanence/mysql/implements/auctionPermanenceImpl";

const router = express.Router();

router.post("", async (req: Request, res: Response) => {
  try {
    const balance: number = req.body.balance;
    const userName: string = req.body.userName;

    const accountPermanence = new AccountPermanenceImpl();
    const ownerPermanence = new OwnerPermanenceImpl(accountPermanence);
    const ownerCreateController = new OwnerCreateController(ownerPermanence);

    const accountId = await accountPermanence.getNewAccountId();
    const account = new AccountImpl(accountId, balance);

    const owner = await ownerCreateController.createNewOwner(userName, account);

    res.status(201).json(owner);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/cargo", async (req: Request, res: Response) => {
  try {
    const ownerId: number = req.body.ownerId;
    const name: string = req.body.name;
    const transportDueDate: string = req.body.transportDueDate;
    const description: string = req.body.description;

    const accountPermanence = new AccountPermanenceImpl();
    const ownerPermanence = new OwnerPermanenceImpl(accountPermanence);
    const truckerPermanence = new TruckerPermanenceImpl(accountPermanence);
    const cargoPermanence = new CargoPermanenceImpl(
      ownerPermanence,
      truckerPermanence
    );
    const auctionPermanence = new AuctionPermanenceImpl(
      ownerPermanence,
      truckerPermanence,
      cargoPermanence
    );

    const owner = await ownerPermanence.getOwner(ownerId);

    const ownerController = new OwnerController(
      ownerPermanence,
      truckerPermanence,
      cargoPermanence,
      auctionPermanence,
      owner
    );

    const cargo = await ownerController.registerNewCargo(
      name,
      transportDueDate,
      description
    );

    res.status(201).json(cargo);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
