import { Router } from 'express';
import * as bookInstanceController from '../controllers/bookInstance.controller';
import { checkValidId } from '../middlewares';

const router: Router = Router();

router.get('/', bookInstanceController.bookInstanceList);
router.get('/:id', checkValidId, bookInstanceController.bookInstanceDetail);
router.post('/', bookInstanceController.bookInstanceCreate);
router.put('/:id', bookInstanceController.bookInstanceUpdate);
router.delete('/:id', bookInstanceController.bookInstanceDelete);

export default router;
