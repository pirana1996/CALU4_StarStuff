export class Bid {
  id_post: string;
  id_user: string;
  price: number;
  email: string;

  constructor(id_post?: string, id_user?: string, price?: number, email?: string) {
    this.id_post = id_post;
    this.id_user = id_user;
    this.price = price;
    this.email = email;
  }
}
