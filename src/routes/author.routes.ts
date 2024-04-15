import { Router } from 'express';
import * as authorController from '../controllers/author.controller';

const router: Router = Router();

router.get('/', authorController.authorList);
router.get('/:id', authorController.authorDetail);
router.post('/', authorController.authorCreate);
router.put('/:id', authorController.authorUpdate);
router.delete('/:id', authorController.authorDelete);

export default router;
