export class Post {
  id?: string;
  startPrice: number;
  currentBid: number;
  user: string;
  title: string;
  description: string;
  imageUrl: string;
  imageUrl1: string;
  imageUrl2: string;
  startDate: Date;
  endDateTime: Date;
  goal: string;

  constructor (startPrice, currentBid, user, title, description, imageUrl, startDate, endDateTime, goal) {
    this.startPrice = startPrice;
    this.currentBid = currentBid;
    this.user = user;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.startDate = startDate;
    this.endDateTime = endDateTime;
    this.goal = goal;
  }
}


