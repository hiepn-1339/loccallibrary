import { Request, Response, NextFunction } from 'express';
import { t } from 'i18next';

export const checkValidId = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.render('error', { title: t('error.invalidId'), message: t('error.invalidId') });
    return;
  }

  next();
};
