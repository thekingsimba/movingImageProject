export interface Category {
  id: number;
  name: string;
}

export interface formatObject {
  res: string;
  size: number;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: {
    one: formatObject,
    two: formatObject,
    three: formatObject
  };
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
  categories: string[];
  bestFormat: string;
  releaseDate: string;
}
