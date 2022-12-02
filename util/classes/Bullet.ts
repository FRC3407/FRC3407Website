import { IBullet } from "../../typings"

export default class Bullet {
    readonly name: string
    readonly author: string
    readonly date: Date
    readonly message: string

    constructor(jsonBullet: IBullet)
    constructor(name: string | IBullet, author?: string, message?: string) {

        if (typeof name !== "string") {
            this.name = name.name
            this.author = name.author
            this.message = name.message
            this.date = new Date(name.date)
        }
        this.name = name as string
        this.author = author as string
        this.message = message as string
        this.date = new Date()
    }

    public toJSON(): IBullet {
        return {
            name: this.name,
            author: this.author,
            message: this.message,
            date: this.date.toISOString()
        }
    }
}