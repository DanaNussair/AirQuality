import express from 'express';
import { sequelize } from './db/connection';
import locationsRouter from './api/airquality';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', locationsRouter);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
