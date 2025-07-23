// src/server.ts
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";

export const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Exemplo",
            version: "1.0.0",
            description: "Uma API de exemplo para integrar o Swagger"
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: [path.resolve(__dirname, "./routes/routes.ts")]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
