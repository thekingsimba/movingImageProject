export interface Category {
  id: number;
  name: string;
}

export interface FormatObject {
  res: string;
  size: number;
}

export interface DataFromDeleteSubject {
  showModal: boolean;
  authorData: Author;
  videoId: number;
  authorID: number;
  newVideoDeleted?: boolean;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: { [key: string]: FormatObject }
  releaseDate: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  authorId: number;
  categories: string[];
  bestFormat: string;
  releaseDate: string;
}
