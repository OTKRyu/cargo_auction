import express, { Request, Response } from "express";

import AccountImpl from "../../../usecase/accountImpl";

import OwnerCreateController from "../../../controller/ownerCreateController";

import OwnerPermanenceImpl from "../../permanence/mysql/implements/ownerPermanenceImpl";
import AccountPermanenceImpl from "../../permanence/mysql/implements/accountPermanenceImpl";

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

export default router;
