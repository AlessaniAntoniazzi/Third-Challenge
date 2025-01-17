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

  static async getEvents(userId: string, dayOfWeek?: string): Promise<IEventModel[]> {
    try {
      if (dayOfWeek) {
        return EventRepository.getEventsByDayOfWeek(userId, dayOfWeek);
      } else {
        return EventRepository.getEvents(userId);
      }
    } catch (error) {
      console.error('Error getting events:', error);
      throw new Error('Could not retrieve events');
    }
  }

  static async deleteEventsByDayOfWeek(userId: string, dayOfWeek: string): Promise<IEventModel[]> {
    try {
      const deletedEvents = await EventRepository.deleteEventsByDayOfWeek(userId, dayOfWeek);
      return deletedEvents;
    } catch (error) {
      console.error('Error deleting events:', error);
      throw new Error('Could not delete events');
    }
  }
  static async getEventById(eventId: string): Promise<IEventModel | null> {
    try {
      const event = await EventRepository.getEventById(eventId);
      return event;
    } catch (error) {
      console.error('Error getting event by ID:', error);
      throw new Error('Could not retrieve event by ID');
    }
  }

  static async deleteEventById(eventId: string): Promise<void> {
    try {
      await EventRepository.deleteEventById(eventId);
    } catch (error) {
      console.error('Error deleting event by ID:', error);
      throw new Error('Could not delete event by ID');
    }
  }
};

