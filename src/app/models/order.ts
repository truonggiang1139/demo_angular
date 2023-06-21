export class ProductOrder {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}
export class Order {
  id: string;
  customerID: string;
  product: ProductOrder[];
  total: number;
}
