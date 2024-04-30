import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import "reflect-metadata";
import * as swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import * as morgan from "morgan";
import helmet from "helmet";
import * as cors from "cors";
import { errorHandlerMiddleware, rateLimiterConfig } from "@efficacy/middlewares";
import { RedisClient } from "./config/redis-config";
import knex from "knex";
import config from "@efficacy/database/src/knexfile";
import * as path from "path";

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json({ limit: '5MB' }));
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(rateLimiterConfig);
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/', 'index.html'));
});

app.use("/api-docs",
    swaggerUi.serve,
    async (_req: Request, res: Response) => {
        return res.send(
            swaggerUi.generateHTML(
                await import("../build/swagger.json"),
                undefined,
                {
                    oauth2RedirectUrl: `http://localhost:3000/api-docs`
                })
        );
    });

RegisterRoutes(app);

// app.use((_req, res: Response) => {
//     res.status(404).send({
//         message: "Not Found",
//     });
// });

app.use(errorHandlerMiddleware);

try {
    app.listen(PORT, async () => {
        console.log("Server is running on port: " + PORT);
        RedisClient.getInstance().connect();
        knex(config).migrate.latest()
            .then(() => {
                return knex(config).seed.run();
            })
            .then(() => {
                console.log('Migration complete');
            });
    });
} catch (e) {
    console.error(e)
}

// process.on('SIGTERM', shutDown);
// process.on('SIGINT', shutDown);

// function shutDown() {
//     if (server) {
//         console.log('Received kill signal, shutting down gracefully');
//         RedisClient.getInstance().disconnect();
//         server.close(() => {
//             console.log('Closed out remaining connections');
//             process.exit(0);
//         });

//         setTimeout(() => {
//             console.error('Could not close connections in time, forcefully shutting down');
//             process.exit(1);
//         }, 10000);
//     }
// }
