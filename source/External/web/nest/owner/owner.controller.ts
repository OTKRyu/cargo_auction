import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Response } from "express"

@Controller("/owner")
export class OwnerController {
  constructor(private readonly appService: OwnerService) {}

  @Post()
  createOwner(@Body() userName:string, @Body() balance: number, @Res() res: Response ) {
    try {
        const owner = this.appService.createOwner(userName, balance);
        res.status(HttpStatus.CREATED).send(owner)
    } catch (error) {
        res.status(500).send(error)
    }
  }
}
