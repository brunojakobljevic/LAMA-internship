export class User {
    id?: number;
    name = "";
    email = "";
}

export class Post {
    id?: number;
    title = "";
    body = "";
    user_id?: number;
    last_update!: Date;
}