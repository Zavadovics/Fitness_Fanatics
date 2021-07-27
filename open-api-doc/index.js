import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import low from 'lowdb';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import router from './routes/activities.js';

const PORT = /* process.env.PORT || */ 4000;

import FileSync from 'lowdb/adapters/FileSync.js';

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ activities: [] }).write();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Fitness Fanatics API",
      description: "Fitness Fanatics API Information",
      contact: {
        name: "Tibor Zavadovics"
      },
      servers: ["http://localhost:5000"]
    }
  },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/activities', router);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
