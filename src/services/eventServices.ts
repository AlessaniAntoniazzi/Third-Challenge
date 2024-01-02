import { EventRepository } from '../repository/eventRepository';
import EventModel, { EventModel as IEventModel } from '../models/eventModel';
import DayOfWeek from '../models/dayOfWeek';

export class EventService {
  static async createEvent(description: string, dayOfWeek: string, userId: string): Promise<IEventModel> {
    if (!Object.values(DayOfWeek).includes(dayOfWeek as DayOfWeek))  {
      throw new Error('Invalid day of week');
  }
  try {
    const newEvent = await EventRepository.createEvent(description, dayOfWeek, userId);
    return newEvent;
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Could not create event');
  }
}
};