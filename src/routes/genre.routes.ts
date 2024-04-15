import { Router } from 'express';
import * as genreController from '../controllers/genre.controller';

const router: Router = Router();

router.get('/', genreController.genreList);
router.get('/:id', genreController.genreDetail);
router.post('/', genreController.genreCreate);
router.put('/:id', genreController.genreUpdate);
router.delete('/:id', genreController.genreDelete);

export default router;
