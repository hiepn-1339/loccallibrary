import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as genreService from '../services/genre.service';
import { t } from 'i18next';
import { Genre } from '../entities/genre.entity';

interface IGenreRequest extends Request {
  genre?: Genre;
}

export const checkExistsGenre = async (req: IGenreRequest, res: Response, next: NextFunction) => {
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

export const genreUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Genre update: ${req.params.id}`);
};

export const genreDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Genre delete: ${req.params.id}`);
};
