import Joi from "joi";
import DayOfWeek from "../models/dayOfWeek";

export const eventSchema = Joi.object({
    description: Joi.string().required(),
    dayOfWeek: Joi.string().valid(...Object.values(DayOfWeek)).required(),
    userId: Joi.string().required(),
});

export const validateEvent = (data: any) => eventSchema.validateAsync(data);

