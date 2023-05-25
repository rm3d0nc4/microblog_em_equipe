import express, { Application} from "express";
import errorMiddleware from "./core/middlewares/error_middleware";
import { postRoutes } from "./routes/post_routes";
import { commentRoutes } from "./routes/comment_routes";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(postRoutes);
app.use(commentRoutes);

app.use(errorMiddleware);

const port: number = 3000;
app.listen(port, () => console.log(`Servidor inicializado em http://localhost:${port}`))

