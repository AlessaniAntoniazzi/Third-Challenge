import DayOfWeek from '../models/dayOfWeek';
import EventModel, { EventModel as IEventModel } from '../models/eventModel';

export class EventRepository {
  static async createEvent(description: string, dayOfWeek: string, userId: string): Promise<IEventModel> {
    const newEvent = await EventModel.create({ description, dayOfWeek, userId });
    const savedEvent = await newEvent.save();
    return savedEvent.toObject() as IEventModel;
  }

  static async getEvents(userId: string): Promise<IEventModel[]> {
    try {
      const query: any = {userId};
      if (DayOfWeek){
        query.dayOfWeek = DayOfWeek;
      }
      const events = await EventModel.find({ userId });
      return events;
    } catch (error) {
      console.error('Error getting events:', error);
      throw new Error('Could not retrieve events');
    }
  }

  static async getEventsByDayOfWeek(userId: string, dayOfWeek: string): Promise<IEventModel[]> {
    const events = await EventModel.find({ userId, dayOfWeek });
    return events;
  }

  static async deleteEventsByDayOfWeek(userId: string, dayOfWeek: string): Promise<void> {
    await EventModel.deleteMany({ userId, dayOfWeek });
  }

  static async getEventById(eventId: string): Promise<IEventModel | null> {
    try {
      const event = await EventModel.findById(eventId);
      console.log(event);
      return event;
    } catch (error) {
      console.error('Error getting event by ID:', error);
      throw new Error('Could not retrieve event by ID');
    }
  }

  static async deleteEventById(eventId: string): Promise<void> {
  await EventModel.findByIdAndDelete(eventId);
  }
  
};
