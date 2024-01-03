import { Request, Response } from "express";
import { EventService } from "../services/eventServices";

export const createEvent = async (req: Request, res: Response) => {
    try {
      const { description, dayOfWeek } = req.body;
      const userId = req.userId; 

      if (userId === undefined || typeof userId !== 'string') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      const newEvent = await EventService.createEvent( description, dayOfWeek, userId);
  
      res.status(201).json({
        message: 'Event created successfully',
        event: newEvent,
      });
    } catch (error: any) {
      console.error('Error creating event:', error);
      res.status(400).json({ error: error.message });
    }
  };

  export const getEvents = async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
  
      if (userId === undefined || typeof userId !== 'string') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const events = await EventService.getEvents(userId);
  
      res.status(200).json({
        message: 'Events retrieved successfully',
        events,
      });
    } catch (error: any) {
      console.error('Error getting events:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const deleteEventsByDayOfWeek = async (req: Request, res: Response) => {
    try {
      const { dayOfWeek } = req.query;
      const userId = req.userId;
  
      if (userId === undefined || typeof userId !== 'string') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      if (dayOfWeek === undefined || typeof dayOfWeek !== 'string') {
        return res.status(400).json({ error: 'dayOfWeek parameter is required' });
      }
  
      await EventService.deleteEventsByDayOfWeek(userId, dayOfWeek);
  
      res.status(200).json({
        message: `Events for ${dayOfWeek} deleted successfully`,
      });
    } catch (error: any) {
      console.error('Error deleting events:', error);
      res.status(400).json({ error: error.message });
    }
  };