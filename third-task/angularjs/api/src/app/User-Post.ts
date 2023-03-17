export interface User{
    id: Number;
    name: string;
    email: string;
}

export interface Post{
    id: Number;
    title: string;
    body: string;
    user_id: Number;
    last_update: Date;
}