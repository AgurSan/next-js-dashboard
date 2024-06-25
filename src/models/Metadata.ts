import mongoose, { Model, Schema } from 'mongoose';
import { IMetadata } from '../types';

const MetadataSchema: Schema = new Schema({
  states: [String],
  years: [Number],
});

const Metadata: Model<IMetadata> =
  mongoose.models.Metadata ||
  mongoose.model<IMetadata>('Metadata', MetadataSchema);

export default Metadata;
