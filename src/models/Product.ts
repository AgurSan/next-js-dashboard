import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from '../types';

const ProductSchema: Schema = new Schema({
  rowId: { type: Number, required: false },
  orderId: { type: String, required: true },
  orderDate: { type: Date, required: true },
  customerId: { type: String, required: true },
  state: { type: String, required: true },
  region: { type: String, required: true },
  productId: { type: String, required: true },
  sales: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
