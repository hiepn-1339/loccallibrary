import { Router } from 'express';
import * as bookInstanceController from '../controllers/bookInstance.controller';

const router: Router = Router();

router.get('/', bookInstanceController.bookInstanceList);
router.get('/:id', bookInstanceController.bookInstanceDetail);
router.post('/', bookInstanceController.bookInstanceCreate);
router.put('/:id', bookInstanceController.bookInstanceUpdate);
router.delete('/:id', bookInstanceController.bookInstanceDelete);

export default router;
