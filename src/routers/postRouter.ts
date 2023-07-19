import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDataBase } from "../database/PostDataBase"


export const postRouter = express.Router()

const postController = new PostController(
new PostBusiness(
      new PostDataBase(),
      new IdGenerator(),
      new TokenManager(),
)
)
 




postRouter.post("/", postController.createPost)
postRouter.get("/", postController.getPosts)
postRouter.put("/:id", postController.editPosts)
postRouter.delete("/:id", postController.deletePost)

postRouter.put("/:id/like", postController.likeOrDislikePost)