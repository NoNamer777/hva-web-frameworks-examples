export class Quiz {
  id: number;
  title: string;

  constructor(id: number = 0, title:string = '') {
    this.id = id;
    this.title = title;
  }
}
