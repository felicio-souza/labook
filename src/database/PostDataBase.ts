import { POST_LIKE, PostDB, PostDBCreatorName, likeOrDislikeDB } from "../models/Post";
import { BaseDataBase } from "./BaseDataBase";
import { UserDataBase } from "./UserDataBase";

export class PostDataBase extends BaseDataBase{

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"


    public insertPost = async (postDB: PostDB): Promise<void>=> {

        await BaseDataBase
        .connection(PostDataBase.TABLE_POSTS)
        .insert(postDB)
       
             
    }

    public getPosts = async (): Promise<PostDBCreatorName[]> => {

        const postsDB  = await BaseDataBase
        .connection(PostDataBase.TABLE_POSTS)
        .select(
            `${PostDataBase.TABLE_POSTS}.id`,
            `${PostDataBase.TABLE_POSTS}.creator_id`,
            `${PostDataBase.TABLE_POSTS}.content`,
            `${PostDataBase.TABLE_POSTS}.likes`,
            `${PostDataBase.TABLE_POSTS}.dislikes`,
            `${PostDataBase.TABLE_POSTS}.created_at`,
            `${PostDataBase.TABLE_POSTS}.updated_id`,
            `${UserDataBase.TABLE_USERS}.name as creator_name`
            
        )
        .join(
            `${UserDataBase.TABLE_USERS}`,
            `${PostDataBase.TABLE_POSTS}.creator_id`,
            "=",
            `${UserDataBase.TABLE_USERS}.id}`
              
        )

        return postsDB as PostDBCreatorName[]
    }


    public findPostById = async (id: string): Promise<PostDB | undefined> => {

        const [result ] = await BaseDataBase
        .connection(PostDataBase.TABLE_POSTS)
        .select()
        .where({id})

        return result as PostDB | undefined
    }

   

    public upDatePost =async (postDB: PostDB): Promise<void>=> {

        await BaseDataBase
        .connection(PostDataBase.TABLE_POSTS)
        .update(postDB)
        .where({id: postDB.id})
       
             
    }

    public deletePostById = async (id: string) : Promise<void>=> {

        await BaseDataBase
        .connection(PostDataBase.TABLE_POSTS)
        .delete()
        .where({id})
        
    }


    public findPostCreatorDB = async (id: string): Promise<PostDBCreatorName | undefined> => {

        const [postsDB]  = await BaseDataBase
        .connection(PostDataBase.TABLE_POSTS)
        .select(
            `${PostDataBase.TABLE_POSTS}.id`,
            `${PostDataBase.TABLE_POSTS}.creator_id`,
            `${PostDataBase.TABLE_POSTS}.content`,
            `${PostDataBase.TABLE_POSTS}.likes`,
            `${PostDataBase.TABLE_POSTS}.dislikes`,
            `${PostDataBase.TABLE_POSTS}.created_at`,
            `${PostDataBase.TABLE_POSTS}.updated_id`,
            `${UserDataBase.TABLE_USERS}.name as creator_name`
            
        )
        .join(
            `${UserDataBase.TABLE_USERS}`,
            `${PostDataBase.TABLE_POSTS}.creator_id`,
            "=",
            `${UserDataBase.TABLE_USERS}.id}`
              
        )
        .where({[`${PostDataBase.TABLE_POSTS}.id`] : id})

        return postsDB as PostDBCreatorName | undefined
    }




    public findLikeDislike = async(likeOrDislikeDB : likeOrDislikeDB): Promise<POST_LIKE | undefined>=>{

        const [result] = await BaseDataBase
        .connection(PostDataBase.TABLE_LIKES_DISLIKES)
        .select()
        .where({
            user_id: likeOrDislikeDB.user_id,
            post_id: likeOrDislikeDB.post_id
        })

        if(result === undefined) {
            
            return undefined

        } else if (result.like === 1){

            return POST_LIKE.ALREADY_LIKED

        } else{

            return POST_LIKE.ALREADY_DISLIKED
        }
      
    }

    public removeLikeDislike = async( likeOrDislikeDB : likeOrDislikeDB) : Promise<void>=>{


        await BaseDataBase
        .connection(PostDataBase.TABLE_LIKES_DISLIKES)
        .delete()
        .where({
            user_id: likeOrDislikeDB.user_id,
            post_id: likeOrDislikeDB.post_id
        })
    }

    public updateLikeDislike = async( likeOrDislikeDB : likeOrDislikeDB) : Promise<void>=>{


        await BaseDataBase
        .connection(PostDataBase.TABLE_LIKES_DISLIKES)
        .update(likeOrDislikeDB)
        .where({
            user_id: likeOrDislikeDB.user_id,
            post_id: likeOrDislikeDB.post_id
        })
    }

    public insertLikeDislike = async(likeOrDislikeDB:likeOrDislikeDB): Promise<void> => {
    
        await BaseDataBase
        .connection(PostDataBase.TABLE_LIKES_DISLIKES)
        .insert(likeOrDislikeDB)
    }

}