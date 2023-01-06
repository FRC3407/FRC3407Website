export interface IDynamicPagePostOptions {
  name: string;
  description: string;
  imgUrl?: string;
}

export interface IDynamicPagePostReturn extends IDynamicPagePostOptions {
  path: string;
}
