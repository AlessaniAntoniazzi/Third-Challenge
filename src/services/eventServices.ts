import { EventRepository } from '../repository/eventRepository';
import { EventModel as IEventModel } from '../models/eventModel';

export class EventService {
  static async createEvent(description: string, dayOfWeek: string, userId: string): Promise<IEventModel> {
    // Additional business logic can go here
    return EventRepository.createEvent(description, dayOfWeek, userId);
  }

}