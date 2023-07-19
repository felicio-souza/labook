import express from "express"
import cors from "cors"
import doteven from "dotenv"
import { userRouter } from "./routers/userRouter"
import { postRouter } from "./routers/postRouter"

doteven.config()
const app = express()

app.use(cors())
app.use(express.json())


app.listen(Number(process.env.PORT), ()=>{

    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})

app.use("/users", userRouter)
app.use("/posts", postRouter)