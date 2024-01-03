import EventModel, { EventModel as IEventModel } from '../models/eventModel';

export class EventRepository {
  static async createEvent(description: string, dayOfWeek: string, userId: string): Promise<IEventModel> {
    const newEvent = await EventModel.create({ description, dayOfWeek, userId });
    const savedEvent = await newEvent.save();
    return savedEvent.toObject() as IEventModel;
  }

  static async getEvents(userId: string): Promise<IEventModel[]> {
    const events = await EventModel.find({ userId });
    return events;
  } catch (error: any) {
    console.error('Error getting events:', error);
    throw new Error('Could not retrieve events');
  }

  static async deleteEventsByDayOfWeek(userId: string, dayOfWeek: string): Promise<void> {
    await EventModel.deleteMany({ userId, dayOfWeek });
  }
};