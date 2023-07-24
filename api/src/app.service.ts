import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return new Promise((resolve, reject) => {
      resolve({ message: 'Hello World!' });
    });
  }
}
