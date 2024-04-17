import { Router } from 'express';
import * as authorController from '../controllers/author.controller';
import { checkValidId } from '../middlewares';

const router: Router = Router();

router.get('/', authorController.authorList);
router.get('/:id', checkValidId, authorController.authorDetail);
router.put('/:id', authorController.authorUpdate);
router.delete('/:id', authorController.authorDelete);

export default router;
