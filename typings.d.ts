export interface IBullet {
  /**
   * Name of the Bullet
   */
  name: string

  /**
   * The Bullet's message
   */
  message: string

  /**
   * The time the bullet was created in ISO format
   */
  date: string

  /**
   * The Bullet's author
   */
  author: string
}

export interface ReqCachingOptions {

  /**
   * If you want to cache the result of the request
   * defaults to true
   */
  cacheResults?: boolean

  /**
   * How long the cache keeps the result in miliseconds
   * defaults to 86400000 (1 day)
   */
  validTime?: number | "forever" | "none"
}