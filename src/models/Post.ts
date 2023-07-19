
export interface PostDB{

        id: string,
        creator_id: string,
        content: string,
        likes : number ,
        dislikes : number,
        created_at: string,
        update_at: string 

}

export interface PostModel{

    
        id: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt:string,
        updatedAt: string,
        creator: {

            id: string,
            name: string
        

}


}

export interface PostDBCreatorName {
    
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at:string,
    updated_at: string,
    creator_id: string,
    creator_name: string

}


export interface likeOrDislikeDB{
    user_id : string,
    post_id : string,
    like : number
}

export enum POST_LIKE {
    ALREADY_LIKED = "ALREADY LIKE",
    ALREADY_DISLIKED= "ALREADY DISLIKE"
}

export class Post {

    constructor (

      
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt:string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string
        
    ){}
 

    public getId():string{
        return this.id
    }
    
    public setId(value: string):void{
        this.id = value
    
    }
    
    public getContente():string{
        return this.content
    }
    
    public setContent(value: string):void{
        this.content = value
    }
    
    public getLikes():number{
        return this.likes
    }
    
    public setLikes(value: number):void{
        this.likes = value
    }

    public editLike(): void{

        this.likes++
    }

    public removelike(): void{

        this.likes--
    }
    
    public getDislikes():number{
        return this.dislikes
    }
    
    public setDislikes(value: number):void{
        this.dislikes = value
    }

    public editDisLike(): void{

        this.dislikes++
    }

    public removeDislike(): void{

        this.dislikes--
    }
 
    
    public getUpdatedAt():string{
        return this.updatedAt
    }
    
    public setUpDateAt(value: string):void{
        this.updatedAt = value
    }
    
    public getCreatorId():string{
      return this.creatorId}
    
    public setCreatorId(value: string): void {
      this.creatorId = value}

      public getCreatorName():string{
        return this.creatorName}
      
      public setCreatorName(value: string): void {
        this.creatorName = value}


   public toDBModel(): PostDB{

    return {
       
        id: this.id,
        creator_id: this.creatorId,
        content: this.content,
        likes : this.likes ,
        dislikes : this.dislikes,
        created_at: this.createdAt,
        update_at: this.updatedAt 
        
    }

    }

    public toBusinessModel(): PostModel{

        return {
           
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt:this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
    
                id: this.creatorId,
                name: this.creatorName
            
        }
    
        }

    }
}