import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {

  executeSeed(): string {
    return `This action returns all seed`;
  }

}
