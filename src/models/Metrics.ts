import mongoose, { Model, Schema } from 'mongoose';
import { IMetrics } from '../types';

const MetricsSchema: Schema = new Schema({
  totalRevenue: Number,
  avgRevenuePerOrder: Number,
  uniqueCustomers: Number,
  monthlyMetrics: Schema.Types.Mixed,
});

const Metrics: Model<IMetrics> =
  mongoose.models.Metrics || mongoose.model<IMetrics>('Metrics', MetricsSchema);

export default Metrics;
