import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationResult } from '@hapi/joi';
import { pick } from 'lodash';
import { requestSchema } from '../utils/typeAliases';

const validate = (schema: requestSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validSchema: requestSchema = pick(schema, ['params', 'query', 'body']);
  const object: Partial<Request> = pick(req, Object.keys(validSchema));

  const { value, error }: ValidationResult = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const { details } = error;
    const messages = details.map((i) => {
      const label = i.context?.label || i.context?.key; // Fallback to the key if label is not available
      const translatedMessage = (req as any).t(`validationErrorMessages.${label}`);
      return translatedMessage || i.message;
    });

    return res.status(422).json({
      message: messages.join(','),
    });
  }

  Object.assign(req, value);
  return next();
};

export default validate;

