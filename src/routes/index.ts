import { Router, Request, Response } from 'express';
import bookRouter from './book.routes';
import authorRouter from './author.routes';
import genreRouter from './genre.routes';
import bookInstanceRouter from './bookInstance.routes';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);
router.use('/bookInstance', bookInstanceRouter);

export default router;
