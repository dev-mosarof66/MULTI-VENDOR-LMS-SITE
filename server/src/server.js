import { app } from "./app.js";
import 'dotenv/config'
import { connectDB } from "./db/db.js";

const port = process.env.PORT || 4000

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening at port : ${port}`)
        })
    })