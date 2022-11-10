import { NextFunction, Request, Response } from 'express';

import * as yup from 'yup';

const validateSchemaMiddleware =
  (schema: yup.AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      if (validatedBody.positions) {
        const values = Object.values(validatedBody.positions);
        if (values.every((value) => typeof value === 'undefined')) {
          delete validatedBody.positions;
        }
      }
      if (validatedBody.address) {
        const values = Object.values(validatedBody.address);
        if (values.every((value) => typeof value === 'undefined')) {
          delete validatedBody.address;
        }
      }
      if (validatedBody.socialNetwork) {
        const values = Object.values(validatedBody.socialNetwork);
        if (values.every((value) => typeof value === 'undefined')) {
          delete validatedBody.socialNetwork;
        }
      }
      console.log(req.validatedBody);
      req.validatedBody = validatedBody;
      return next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: any = {};
        error.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        return res.status(400).json({
          message: validationErrors,
        });
      }
    }
  };

export default validateSchemaMiddleware;
