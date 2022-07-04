const express = require('express')
const cors = require('cors')
const alertRouter = require('./routers/alertRouter')
const entityRouter = require('./routers/entityRouter')
const policyRouter = require('./routers/policyRouter')
const userRouter = require('./routers/userRouter')
require('./db/dbConnect')

const app = express();

app.use(cors())
app.use(express.json())
app.use(alertRouter)
app.use(entityRouter)
app.use(policyRouter)
app.use(userRouter)


module.exports = app