import mongoose, { Schema, Document } from 'mongoose';
import DayOfWeek from './dayOfWeek';

export interface EventModel extends Document {
    description: string;
    dayOfWeek: DayOfWeek;
    userId: string;
};

const eventSchema = new Schema<EventModel>({
    description: { type: String, required: true },
    dayOfWeek: { type: String, enum: Object.values(DayOfWeek), required: true },
    userId: { type: String, required: true }, 
  });
  
  export default mongoose.model<EventModel>('Event', eventSchema);