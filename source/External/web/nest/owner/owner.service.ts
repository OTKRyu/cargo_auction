import { Injectable } from '@nestjs/common';

import OwnerCreateController from "../../../../controller/ownerCreateController"
import OwnerPermanenceImpl from 'source/external/permanence/mysql/implements/ownerPermanenceImpl';
import AccountPermanenceImpl from 'source/external/permanence/mysql/implements/accountPermanenceImpl';
import AccountImpl from 'source/usecase/accountImpl';

@Injectable()
export class OwnerService {
  async createOwner(userName: string, balance: number) {
    const accountPermanence = new AccountPermanenceImpl()
    const ownerPermanence = new OwnerPermanenceImpl(accountPermanence)
    const ownerCreateController = new OwnerCreateController(ownerPermanence)

    const accountId = await accountPermanence.getNewAccountId()
    const account = new AccountImpl(accountId, balance)

    const owner = ownerCreateController.createNewOwner(userName,account)
    return owner
  }
}
