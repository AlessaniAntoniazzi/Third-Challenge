import mongoose, { Schema, Document } from 'mongoose';

export interface EventModel extends Document {
    description: string;
    dayOfWeek: string;
    userId: string;
};

const eventSchema = new Schema<EventModel>({
    description: { type: String, required: true },
    dayOfWeek: { type: String, required: true },
    userId: { type: String, required: true }, 
  });
  
  export default mongoose.model<EventModel>('Event', eventSchema);