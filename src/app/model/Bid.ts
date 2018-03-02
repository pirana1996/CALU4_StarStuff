export class Bid {
  id_post: string;
  id_user: string;
  price: number;
  email: string;
  photoURL?: string;
  displayName?: string;

  constructor(id_post?: string, id_user?: string, price?: number, email?: string, photoURL?: string, displayName?: string) {
    this.id_post = id_post;
    this.id_user = id_user;
    this.price = price;
    this.email = email;
    this.photoURL = photoURL;
    this.displayName = displayName;
  }
}
