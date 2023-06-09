import express, { Application} from "express";
import errorMiddleware from "./core/middlewares/error_middleware";
import cors from "cors";
import { postRoutes } from "./routes/post_routes";
import { commentRoutes } from "./routes/comment_routes";
import { authRoutes } from "./routes/auth_routes";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);

app.use(errorMiddleware);

const port = 3000;
app.listen(port, () => console.log(`Servidor inicializado em http://localhost:${port}`))

