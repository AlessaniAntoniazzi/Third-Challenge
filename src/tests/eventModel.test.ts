import { Schema } from 'mongoose';
import EventModel from '../models/eventModel';
import DayOfWeek from '../models/dayOfWeek';

describe('EventModel', () => {
  it('should have the correct schema', () => {
    const eventSchema = EventModel.schema;
    const description = eventSchema.obj.description;
    const dayOfWeek = eventSchema.obj.dayOfWeek;
    const userId = eventSchema.obj.userId;

    expect(description).toEqual({ type: String, required: true });
    expect(dayOfWeek).toEqual({ type: String, enum: Object.values(DayOfWeek), required: true });
    expect(userId).toEqual({ type: String, required: true });
  });
});