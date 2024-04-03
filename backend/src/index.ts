import app from './app.js'
import { connectToDatabase } from './database/connect.js'

const PORT = process.env.PORT || 5000;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to DB')
        })
    })
    .catch((err) => {
        console.log(err);
        console.log('Could not connect to DB')
    })

