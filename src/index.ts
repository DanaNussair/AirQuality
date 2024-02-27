import express from 'express'
import { sequelize } from './db/connection'

const app = express()
const port = process.env.PORT || 3000

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})
