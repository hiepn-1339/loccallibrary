import express, { Express, Request, Response } from 'express';
import config from './config';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import route from './routes';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';

const app: Express = express();
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{lng}}.json',
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
    },
    fallbackLng: 'vi',
    preload: ['vi', 'en'],
  });
app.use(i18nextMiddleware.handle(i18next));
app.use(
  i18nextMiddleware.handle(i18next, {
    removeLngFromUrl: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('combined'));
app.set('view engine', 'pug');

app.use('', route);

app.use((err: any, req: Request, res: Response) => {
  if (err) {
    console.error(err.stack);
  } else {
    res.status(500).send('Đã xảy ra lỗi!');
  }
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
