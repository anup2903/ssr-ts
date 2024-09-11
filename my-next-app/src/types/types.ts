// types.ts
import { ParsedUrlQuery } from 'querystring';


export interface Data {
    id: string;
    title: string;
    description: string;
    image: string;
  }
  
  export interface Params extends ParsedUrlQuery{
    id: string;
  }
  