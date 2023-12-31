import { PostDataBase } from "../database/PostDataBase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/post/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/post/getPost.dto";
import { LikeDislikePostInputDTO, LikeDislikePostOutputDTO } from "../dtos/post/likeDislikePost.dto";
import { ForBiddenError } from "../erros/ForBiddenError";
import { NotFoundError } from "../erros/NotFoundError";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { POST_LIKE, Post, likeOrDislikeDB } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class PostBusiness {

    constructor(

        private postDataBase: PostDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager

    ){}


    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {
        
        const {token, content} = input

        const payload = this.tokenManager.getPayload(token) 

        if(!payload){

            throw new UnauthorizedError()

        }
        const id = this.idGenerator.generate()
        const post = new Post(

        id,
        content,
        0,
        0,
        new Date().toISOString(),
        new Date().toISOString(),
        payload.id,
        payload.name
        )
            const postDB = post.toDBModel()
            await this.postDataBase.insertPost(postDB)

            const output: CreatePostOutputDTO = undefined

            return output
        
    }


    public getPost = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {
        
        const {token} = input

        const payload = this.tokenManager.getPayload(token) 

        if(!payload){

            throw new UnauthorizedError()

        }

        const postsDB = await this.postDataBase.getPosts()

        const posts = postsDB.map((postCreated)=>{

            const post = new Post(

                postCreated.id,
                postCreated.content,
                postCreated.likes,
                postCreated.dislikes,
                postCreated.created_at,
                postCreated.updated_at,
                postCreated.creator_id,
                postCreated.creator_name


            )
            return post.toBusinessModel()
        })

        const output: GetPostOutputDTO = posts

        return output
}




public editPost = async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {
        
    const {token, content, idToPostEdit } = input

    const payload = this.tokenManager.getPayload(token) 

    if(!payload){

        throw new UnauthorizedError()

    }
    const postDB = await this.postDataBase.findPostById(idToPostEdit)

    if(!postDB){

        throw new NotFoundError("Post com esse ID não exite")
    }

    if(payload.id !== postDB.creator_id){

        throw new ForBiddenError("Somente quem criou o post pode edita-lo")
    }

const post = new Post(

    postDB.id,
    postDB.content,
    postDB.likes,
    postDB.dislikes,
    postDB.created_at,
    postDB.update_at,
    postDB.creator_id,
    payload.name

)
   post.setContent(content)
      
    const upDatePostDB = post.toDBModel()
    await this.postDataBase.upDatePost(upDatePostDB)

    const output : EditPostOutputDTO = undefined
    return output
}

public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        
    const {token, idToDelete } = input

    const payload = this.tokenManager.getPayload(token) 

    if(!payload){

        throw new UnauthorizedError()

    }
    const postDB = await this.postDataBase.findPostById(idToDelete)

    if(!postDB){

        throw new NotFoundError("Post com esse ID não exite")
    }

    if(payload.role !== USER_ROLES.ADMIN){

        if(payload.id !== postDB.creator_id){

            throw new ForBiddenError("Somente quem criou o post pode edita-lo")
        }
    
    }

       
   
    await this.postDataBase.deletePostById(idToDelete)

    const output : DeletePostOutputDTO = undefined
    return output
}


public likeOrDislikePost = async (input: LikeDislikePostInputDTO): Promise<LikeDislikePostOutputDTO> => {
        
    const {token, like, postId, } = input

    const payload = this.tokenManager.getPayload(token) 

    if(!payload){

        throw new UnauthorizedError()

    }

    const postDbCreatorName = await this.postDataBase.findPostCreatorDB(postId)

    if(!postDbCreatorName){

        throw new NotFoundError("post com essa id não existe")

    }
    const post = new Post(

    postDbCreatorName.id,
    postDbCreatorName.content,
    postDbCreatorName.likes,
    postDbCreatorName.dislikes,
    postDbCreatorName.created_at,
    postDbCreatorName.updated_at,
    postDbCreatorName.creator_id,
    postDbCreatorName.creator_name
    
)

const likeSQlite = like? 1 : 0

const likeOrDislikeDB : likeOrDislikeDB = {

    user_id : payload.id,
    post_id : postId,
    like : likeSQlite
}

const likeDislikeExist = await this.postDataBase.findLikeDislike(likeOrDislikeDB)

if(likeDislikeExist === POST_LIKE.ALREADY_LIKED){

    if(like){

        await this.postDataBase.removeLikeDislike(likeOrDislikeDB)
        post.removelike
    }else {
        await this.postDataBase.updateLikeDislike(likeOrDislikeDB)
        post.removelike
        post.editLike
    }

} else if (likeDislikeExist === POST_LIKE.ALREADY_DISLIKED){

    if(like === false){

        await this.postDataBase.removeLikeDislike(likeOrDislikeDB)
        post.removeDislike
    }else {
        await this.postDataBase.updateLikeDislike(likeOrDislikeDB)
        post.removeDislike
        post.editDisLike
    }

} else{

    await this.postDataBase.insertLikeDislike(likeOrDislikeDB)



}

const updatePostDbB = post.toDBModel()

await this.postDataBase.upDatePost(updatePostDbB)

const output: LikeDislikePostOutputDTO = undefined

return output
        
    }
    
}
