import { Request, Response } from "express";
import { EventService } from "../services/eventServices";

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
  
      const newEvent = await EventService.createEvent( description, dayOfWeek, userId);
  
      res.status(200).json({
        message: 'Successful operation',
        event: newEvent,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Not Authenticated',
    }) 
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    })

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
  
      res.status(200).json({
        message: 'Successful operation',
        events,
      });
    } catch (error: any) {
      res.status(400).json({ 
        error: 	'Invalid data supplied'
      });
    } 
    res.status(404).json({
      error: 'Not Found',
      message: 'Not found',
    })
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    })
};

export const deleteEventsByDayOfWeek = async (req: Request, res: Response) => {
    try {
      const { dayOfWeek } = req.body; 
      const userId = req.userId;
  
      if (userId === undefined || typeof userId !== 'string') {
        return res.status(401).json({ 
          error: 'Unauthorized',
          message: 'Not Authenticated' 
        })
      }
  
      if (dayOfWeek === undefined || typeof dayOfWeek !== 'string') {
        return res.status(400).json({ error: 'Invalid data supplied' });
      }
  
      await EventService.deleteEventsByDayOfWeek(userId, dayOfWeek);
  
      res.status(200).json({
        message: 'List of deleteDailyEvents',
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    } 
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Not Authenticated',
    })
    res.status(404).json({
      error: 'Not Found',
      message: 'Not found',
    })
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    })
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
  
    if (!eventId) {
      return res.status(400).json({ error: 'Invalid data supplied' });
    }
  
    const event = await EventService.getEventById(eventId);
  
    if (!event) {
      return res.status(404).json({ 
        error: 'Event not found',
        message: 'Event not found'
      });
    }
  
    res.status(200).json({
      message: 'Successful operation',
      event,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required in the params' });
    }

    await EventService.deleteEventById(eventId);

    res.status(200).json({
      message: `Event with ID ${eventId} deleted successfully`,
    });
  } catch (error: any) {
    console.error('Error deleting event by ID:', error);
    res.status(400).json({ error: error.message });
  }
};