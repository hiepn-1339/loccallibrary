import { Router } from 'express';
import * as bookController from '../controllers/book.controller';
import { checkValidId } from '../middlewares';

const router: Router = Router();

router.get('/', bookController.bookList);
router.get('/:id', checkValidId, bookController.bookDetail);
router.post('/', bookController.bookCreate);
router.put('/:id', bookController.bookUpdate);
router.delete('/:id', bookController.bookDelete);

export default router;
