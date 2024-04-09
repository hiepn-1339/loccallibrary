import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as genreService from '../services/genre.service';
import { t } from 'i18next';
import { Genre } from '../entities/genre.entity';
import { ActionForm } from '../constant';
import { Result, body, validationResult } from 'express-validator';
import { checkValidId } from '../middlewares';

interface IGenreRequest extends Request {
  genre?: Genre;
}

const checkExistsGenre = async (req: IGenreRequest, res: Response, next: NextFunction) => {
  const genre = await genreService.genreDetail(parseInt(req.params.id));
  if (genre === null) {
    res.render('error', { title: t('error.notFound'), message: t('error.notFound') });
  }

  req.genre = genre;
  next();
};

export const genreList = asyncHandler(async (req: Request, res: Response) => {
  const genres = await genreService.genreList();
  res.render('genres/index', { genres, title: t('home.genreList') });
});

export const genreDetail = [checkExistsGenre, (req: IGenreRequest, res: Response) => {
  res.render('genres/show', {
    genre: req.genre,
    books: req.genre?.books,
  });
}];

export const genreCreateGet = (req: Request, res: Response) => {
  res.render('genres/form', {
    title: t('home.createGenre'), action: ActionForm.Create,
  });
};

export const genreCreatePost = [
  body('name', t('error.genreNameMustContainAtLeast3Characters')).trim().isLength({ min: 3 }).escape(),
  (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('genres/form', {
        title: t('home.createGenre'),
        action: ActionForm.Create,
        genre: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      const genre = genreService.genreCreatePost(req.body);
      res.redirect(`/genre/${genre.id}`);
    }
  },
];

export const genreUpdateGet = [checkValidId, checkExistsGenre, (req: IGenreRequest, res: Response) => {
  res.render('genres/form', {
    title: t('home.updateGenre'), genre: req.genre, action: ActionForm.Update,
  });
}];

export const genreUpdatePost = [
  checkValidId, 
  body('name', t('error.genreNameMustContainAtLeast3Characters')).trim().isLength({ min: 3 }).escape(),
  checkExistsGenre, 
  asyncHandler(async (req: IGenreRequest, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('genres/form', {
        title: t('home.updateGenre'),
        genre: req.body,
        action: ActionForm.Update,
        errors: errors.array(),
      });
      return;
    }

      const genre = await genreService.genreUpdatePost(req.genre, req.body);
      res.redirect(`/genre/${genre.id}`);
    },
)];

export const genreDeleteGet = [checkValidId, checkExistsGenre, (req: IGenreRequest, res: Response) => {
  res.render('genres/delete', { title: t('home.deleteGenre'), genre: req.genre });
}];

export const genreDeletePost = [checkValidId, checkExistsGenre, asyncHandler(async (req: Request, res: Response) => {
  await genreService.genreDeletePost(parseInt(req.params.id));
  res.redirect('/genre');
})];
