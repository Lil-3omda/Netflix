import { Injectable } from '@angular/core';
export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  category: string;
  imageUrl: string;
  type: 'film' | 'series' | 'documentary' | 'kids' | 'reality' | 'stand-up-comedy' | 'game';
}
@Injectable({
  providedIn: 'root'
})
export class Content {
private movies: Movie[] = [
    {
      id: 1,
      title: 'BRICK',
      releaseDate: 'July 10, 2025',
      category: 'series',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BMGRjZTI5NmEtNWQzNi00ZDUxLWFmZmQtOGFiZmNkZGY1MDc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      type: 'series'
    },
    {
      id: 2,
      title: 'ALMOST COPS',
      releaseDate: 'July 11, 2025',
      category: 'film',
      imageUrl: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2025/07/almost-cops-2025-netflix-film-poster.jpg',
      type: 'film'
    },
    {
      id: 3,
      title: "TYLER PERRY'S MADEA'S DESTINATION WEDDING",
      releaseDate: 'July 11, 2025',
      category: 'film',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BYzRkM2JmM2EtNTgzZi00MzdlLTkxM2ItNTlhNmQzZjM2NjA2XkEyXkFqcGc@._V1_.jpg',
      type: 'film'
    },
    {
      id: 4,
      title: "IT'S WORTH IT BY DANI ROVIRA",
      releaseDate: 'July 11, 2025',
      category: 'stand-up-comedy',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BNjZiYmFmZWYtODg1OC00OWU5LTljOTctNDIzY2E5ZTdhODBkXkEyXkFqcGc@._V1_.jpg',
      type: 'stand-up-comedy'
    },
    {
      id: 5,
      title: 'Aap Jaisa Koi',
      releaseDate: 'July 11, 2025',
      category: 'series',
      imageUrl: 'https://i.scdn.co/image/ab67616d00001e02b83c0e12cbf7d163a546ba28',
      type: 'series'
    },
    {
      id: 6,
      title: 'ATTACK ON LONDON: HUNTING THE 7/7 BOMBERS',
      releaseDate: 'July 1, 2025',
      category: 'documentary',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BNjVhZTlkYTgtNWExYy00OWZhLWI0ZGMtZWVjNDZlM2EyOWQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      type: 'documentary'
    },
    {
      id: 7,
      title: 'TRAINWRECK: THE CULT OF AMERICAN APPAREL',
      releaseDate: 'July 1, 2025',
      category: 'documentary',
      imageUrl: 'https://dnm.nflximg.net/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABRuIs9lsuEeQGWyCtMaZRgx3OrpuujQpLsXtBFznUF0YRsEy0wZhVirN83SG3DtKP1pxWXzhIXrIS93uoklJH4Z_UfS51Jm8CvwrBXJsRfVheHUL-PTPALlKZ0_uT35O7RjM3g.jpg?r=5b3',
      type: 'documentary'
    },
    {
      id: 8,
      title: 'TOUR DE FRANCE: UNCHAINED',
      releaseDate: 'July 2, 2025',
      category: 'documentary',
      imageUrl: 'https://resizing.flixster.com/aUpBFhGHrSGwd5OdkhN_qgtR7Hw=/fit-in/352x330/v2/https://resizing.flixster.com/BEvyQZd52BJDyKZCx5lpdcxqehI=/ems.cHJkLWVtcy1hc3NldHMvdHZzZXJpZXMvMGRiZDI2NjktODUzYi00YzhkLThjYTctMzkxYWFjNGM3YmM0LmpwZw==',
      type: 'documentary'
    },
    {
      id: 9,
      title: 'THE OLD GUARD 2',
      releaseDate: 'July 2, 2025',
      category: 'film',
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BYzMwNjVjNTEtZDVhOC00NzQzLTg0MGYtMGI1Yzc0Nzg2MjNmXkEyXkFqcGc@._V1_.jpg',
      type: 'film'
    },
    {
      id: 10,
      title: 'THE SANDMAN',
      releaseDate: 'July 3, 2025',
      category: 'series',
      imageUrl: 'https://variety.com/wp-content/uploads/2025/01/The-Sandman-Season-2.jpg?w=691',
      type: 'series'
    }
  ];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  getMoviesByCategory(category: string): Movie[] {
    if (!category) return this.movies;
    return this.movies.filter(movie => movie.type === category);
  }

  getMoviesByMonth(month: string): Movie[] {
    if (!month) return this.movies;
    return this.movies.filter(movie =>
      movie.releaseDate.toLowerCase().includes(month.toLowerCase())
    );
  }
}
