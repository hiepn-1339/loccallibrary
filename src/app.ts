import express, { Express, NextFunction, Request, Response } from "express";
import config from "./config";
import cookieParser from 'cookie-parser';
import path from "path";
import morgan from 'morgan';
import indexRouter from './routes/index'

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('combined'))
app.set('view engine', 'pug')

app.use("/", indexRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(500)
  res.render('error')
})

const port = config.port
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
