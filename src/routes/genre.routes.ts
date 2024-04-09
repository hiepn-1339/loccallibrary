import { Router } from 'express';
import * as genreController from '../controllers/genre.controller';
import { checkValidId } from '../middlewares';

const router: Router = Router();

router.get('/', genreController.genreList);
router.get('/:id', checkValidId, genreController.genreDetail);
router.put('/:id', genreController.genreUpdate);
router.delete('/:id', genreController.genreDelete);

export default router;
