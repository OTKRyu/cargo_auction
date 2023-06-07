import express, { Request, Response } from "express";

import AccountImpl from "../../../usecase/accountImpl";

import TruckerCreateController from "../../../controller/truckerCreateCotroller";

import TruckerPermanenceImpl from "../../permanence/mysql/implements/truckerPermanenceImpl";
import AccountPermanenceImpl from "../../permanence/mysql/implements/accountPermanenceImpl";

const router = express.Router();

router.post("", async (req: Request, res: Response) => {
  try {
    const balance: number = req.body.balance;
    const userName: string = req.body.userName;

    const accountPermanence = new AccountPermanenceImpl();
    const truckerPermanence = new TruckerPermanenceImpl(accountPermanence);
    const truckerCreateController = new TruckerCreateController(
      truckerPermanence
    );

    const accountId = await accountPermanence.getNewAccountId();
    const account = new AccountImpl(accountId, balance);

    const owner = await truckerCreateController.createNewTrucker(userName, account);

    res.status(201).json(owner);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
