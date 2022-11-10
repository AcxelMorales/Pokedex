import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export const handleExceptions = (error: any): void =>  {
  if (error.code === 11000) {
    throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
  }

  console.log(error);
  throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
}
