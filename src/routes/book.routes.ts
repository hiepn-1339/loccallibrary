import { Router } from 'express';
import * as bookController from '../controllers/book.controller';

const router: Router = Router();

router.get('/', bookController.bookList);
router.get('/:id', bookController.bookDetail);
router.post('/', bookController.bookCreate);
router.put('/:id', bookController.bookUpdate);
router.delete('/:id', bookController.bookDelete);

export default router;
