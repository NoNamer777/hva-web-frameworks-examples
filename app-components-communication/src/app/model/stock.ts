export class Stock {
  public id: string;
  public price: number;
  public variation: number;
  public alert: boolean;
  public variationAlert: number;

  constructor(id: string) {
    this.id = id;
    this.price = (Math.random() * 10) + 1; // any price between 1 and 10
    this.variation = (Math.random() * 2); // any variation between 0 and 2%
  }

  static trueCopy(stock: Stock): Stock {
    return Object.assign(new Stock(''), stock);
  }

}
