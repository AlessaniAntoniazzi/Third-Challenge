import EventModel, { EventModel as IEventModel } from '../models/eventModel';

export class EventRepository {
  static async createEvent(description: string, dayOfWeek: string, userId: string): Promise<IEventModel> {
    const newEvent = await EventModel.create({ description, dayOfWeek, userId });
    const savedEvent = await newEvent.save();
    return savedEvent.toObject() as IEventModel;
  }
};