export interface Genre {
    id: number;
    name: string;
  }


  export interface MovieType {
    id: number;
    title: string;
    description: string;
    rating: number;
    genre: Genre;
    [key: string]: any ,
  }