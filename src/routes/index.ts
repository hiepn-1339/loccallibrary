import { Router } from 'express';
import bookRouter from './book.routes';
import authorRouter from './author.routes';
import genreRouter from './genre.routes';
import bookInstanceRouter from './bookInstance.routes';
import { index } from '../controllers/book.controller';

const router: Router = Router();

router.get('/', index);

router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);
router.use('/bookInstance', bookInstanceRouter);

export default router;
