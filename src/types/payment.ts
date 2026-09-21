export interface Payment {
  _id: string;
  reference: string;
  amount: number;
  email: string;
  status: string;
  paidAt?: string;
}