import { IOrder, IOrderResult, IProduct } from "../types";
import { Api, ApiListResponse } from "./base/api";

export class ApiShop extends Api {
  readonly cdnUrl: string;

  constructor(cdnUrl: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdnUrl = cdnUrl;
  }

  getItemList(): Promise<IProduct[]> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdnUrl + item.image
      }))
    );
  }

  getItem(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`).then((item: IProduct) =>({
      ...item,
      image: this.cdnUrl + item.image
    }));
  }

  orderProduct(order: IOrder): Promise<IOrderResult> {
    return this.post('/order', order).then((data: IOrderResult) => data);
  }
}