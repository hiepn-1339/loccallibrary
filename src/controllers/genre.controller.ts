import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as genreService from '../services/genre.service';
import { t } from 'i18next';

export const genreList = asyncHandler(async (req: Request, res: Response) => {
  const genres = await genreService.genreList();
  res.render('genres/index', { genres, title: t('home.genreList') });
});

export const genreDetail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
};

export const genreCreate = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Genre create');
};

export const genreUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Genre update: ${req.params.id}`);
};

export const genreDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Genre delete: ${req.params.id}`);
};
