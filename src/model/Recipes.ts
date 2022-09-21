export interface RecipesDB {
    id: string,
    title: string,
    description: string,
    create_Date: string,
    user_id: string
}

export default class Recipes {
    private id: string
    private title: string
    private description: string
    private create_Date: string
    private user_id: string

    constructor(id: string, title: string, description: string, create_Date: string, user_id: string) {
        this.id = id
        this.title = title
        this.description = description
        this.create_Date = create_Date
        this.user_id = user_id
    }
    public getId() {
        return this.id
    }
    public getTitle() {
        return this.title
    }
    public getDescription() {
        return this.description
    }
    public getCreate_Date() {
        return this.create_Date
    }
    public getUser_id() {
        return this.user_id
    }
}