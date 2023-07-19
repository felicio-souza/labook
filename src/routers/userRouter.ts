import express from "express"
import { UserController } from "../controller/UserController"
import { UserDataBase } from "../database/UserDataBase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"
import { UserBusiness } from "../business/UserBusiness"




export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDataBase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
        )
)
    userRouter.post("/signup", userController.signup)
    userRouter.post("/login", userController.login)

