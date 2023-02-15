export class Mask {

  public static getArea(): Array<string | RegExp> {
    return [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, ',', /\d/, /\d/];
  }
}