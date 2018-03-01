export class Bid {
  id_post: number;
  id_user: number;
  price: number;
  email: string;

  constructor(id_post?: number, id_user?: number, price?: number, email?: string) {
    this.id_post = id_post;
    this.id_user = id_user;
    this.price = price;
    this.email = email;
  }
}
