import Joi from 'joi';
import { eventSchema } from '../middleware/eventsSchema';
import DayOfWeek from '../models/dayOfWeek';

describe('eventSchema', () => {
  it('should validate the schema correctly', () => {
    const validEvent = {
      description: 'Sample event',
      dayOfWeek: DayOfWeek.Monday,
      userId: '1234567890',
    };

    const result = eventSchema.validate(validEvent);

    expect(result.error).toBeUndefined();
  });

  it('should require description field', () => {
    const invalidEvent = {
      dayOfWeek: DayOfWeek.Monday,
      userId: '1234567890',
    };

    const result = eventSchema.validate(invalidEvent);

    expect(result.error).toBeDefined();
    expect((result.error as Joi.ValidationError).details[0].message).toContain('"description" is required');
  });

  it('should require dayOfWeek field to be a valid day', () => {
    const invalidEvent = {
      description: 'Sample event',
      dayOfWeek: 'InvalidDay',
      userId: '1234567890',
    };

    const result = eventSchema.validate(invalidEvent);

    expect(result.error).toBeDefined();
    expect((result.error as Joi.ValidationError).details[0].message).toContain('"dayOfWeek" must be one of');
  });

  it('should require userId field', () => {
    const invalidEvent = {
      description: 'Sample event',
      dayOfWeek: DayOfWeek.Monday,
    };

    const result = eventSchema.validate(invalidEvent);

    expect(result.error).toBeDefined();
    expect((result.error as Joi.ValidationError).details[0].message).toContain('"userId" is required');
  });
});