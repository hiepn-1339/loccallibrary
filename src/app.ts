import express, { Express, Request, Response } from 'express';
import config from './config';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import route from './routes';
import 'reflect-metadata';
import { AppDataSource } from './data-source';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('combined'));
app.set('view engine', 'pug');

app.use('', route);

app.use((err: Error, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(500);
  res.render('error');
});

const port = config.port;

AppDataSource.initialize()
  .then(() => {
    console.log('Connect to Database successfully!');
  })
  .catch((error) => console.log(error));
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
