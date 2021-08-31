export interface IPostGetter { 
    status:boolean,
    data: any[]
}

export interface IPostCreate {
    title:string,
    image:string,
    status:string,
    type:string,
    tags:string,
    content:string
}

export interface IPostUpdate extends IPostCreate { }

export interface IPostResponse { 
    status:boolean,
    data:boolean
}