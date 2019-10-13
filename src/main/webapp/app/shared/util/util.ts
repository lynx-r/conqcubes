export function log(...message: any) {
  // eslint-disable-next-line no-console
  console.log(...message);
}

export class Util {
  static getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
