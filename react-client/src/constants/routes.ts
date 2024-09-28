interface Route  {
  readonly name:string 
  url: string
}

const routes:Route[]=[
    {
      name:"login",
      url:"/login"
    }
] as const
// export type ArrayValues<T extends readonly unknown[]> = T[number];
export type ArrayValues<T extends readonly unknown[]> = T[number];
export type NamedRoutes=ArrayValues<typeof routes>['name']

export const navigate=(route:NamedRoutes)=>{
  
}

