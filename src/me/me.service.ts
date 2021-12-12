import { Injectable } from '@nestjs/common';

@Injectable()
export class MeService {
  getHello(): string {
    return 'Hello World!';
  }
}
