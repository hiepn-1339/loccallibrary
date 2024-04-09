import { NextFunction, Router } from 'express';
import bookRouter from './book.routes';
import authorRouter from './author.routes';
import genreRouter from './genre.routes';
import bookInstanceRouter from './bookInstance.routes';
import { index } from '../controllers/book.controller';
import i18next from 'i18next';
import { Request, Response } from 'express';

const router: Router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  const lng = req.query.lng as string || 'vi';
  i18next.changeLanguage(lng);
  next();
});

router.get('/', index);

router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);
router.use('/bookInstance', bookInstanceRouter);

export default router;
