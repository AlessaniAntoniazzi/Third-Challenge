import { Request, Response } from "express";
import { EventService } from "../services/eventServices";
import { validateEvent } from "../middleware/eventsSchema";
import { ValidationError } from "joi";

export const createEvent = async (req: Request, res: Response) => {
    try {
      const { description, dayOfWeek } = req.body;
      const userId = req.userId; 

      if (userId === undefined || typeof userId !== 'string') {
        return res.status(401).json({ 
          error: 'Unauthorized',
          message: 'Not Authenticated'
         });
      }
      await validateEvent({ description, dayOfWeek, userId });

      const newEvent = await EventService.createEvent( description, dayOfWeek, userId);
  
      res.status(200).json({
        message: 'Successful operation',
        event: newEvent,
      });
    } catch (error: any) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          error: 'Bad Request',
          message: error.details.map((detail) => detail.message).join(', '),
        });
      } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong',
      })
    }
  }

};

export const getEventsByDayOfWeek = async (req: Request, res: Response) => {
    try {
      const { dayOfWeek } = req.query;
      const userId = req.userId;
  
      if (userId === undefined || typeof userId !== 'string') {
        return res.status(401).json({ 
          error: 'Unauthorized',
          message: 'Not Authenticated' 
        });
      }
  
      if (dayOfWeek === undefined || typeof dayOfWeek !== 'string') {
        return res.status(400).json({ 
          error: 'Invalid data supplied' 
        });
      }

  
      const events = await EventService.getEvents(userId, dayOfWeek);

      if (!events || events.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Not found',
        });
      }
  
      res.status(200).json({
        message: 'Successful operation',
        events,
      });
    } catch (error: any) {
      console.error('Error getting events:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong',
      });
    }
};

export const deleteEventsByDayOfWeek = async (req: Request, res: Response) => {
    try {
      const { dayOfWeek } = req.query; 
      const userId = req.userId;
  
      if (!userId ||  typeof userId !== 'string') {
        return res.status(401).json({ 
          error: 'Unauthorized',
          message: 'Not Authenticated' 
        })
      }
      
      const deletedEvents = await EventService.deleteEventsByDayOfWeek(userId, dayOfWeek as string);

      if (!deletedEvents || deletedEvents.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Not Found',
        });
      }

      if (dayOfWeek === undefined || typeof dayOfWeek !== 'string') {
        return res.status(400).json({ error: 'Invalid data supplied' });
      }
  
      res.status(200).json({
        message: 'List of deleteDailyEvents',
        deletedEvents,
      });

    } catch (error: any) {
    console.error('Error getting events:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });
  }
} 


export const getEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
  
    if (!eventId) {
      return res.status(400).json({ error: 'Invalid data supplied' });
    }
  
    const event = await EventService.getEventById(eventId);
  
    if (!event) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Not found'
      });
    }
    
    if (event.userId !== req.userId) {
        return res.status(401).json({ 
          error: 'Unauthorized',
          message: 'Not Authenticated'
      });
    }

    res.status(200).json({
      message: 'Successful operation',
      event,
    });
  } catch (error: any) {
    console.error('Error getting events:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });
  }
};

export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required in the params' });
    }

    const event = await EventService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Event not found'
      });
    }

    if (event.userId !== req.userId) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Not Authenticated'
    });
    }
    
    await EventService.deleteEventById(eventId);

    res.status(204).json({
      message: `Event deleted`,
    });
  } catch (error: any) {
    console.error('Error getting events:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });
  }
};