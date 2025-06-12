export interface IPagination {
    page: number
    totalCount: number
    totalPages: number
}

export interface IPaginationContextType {
   value: number;
   setValue: (page: number) => void;
}

export interface IPaginationContextTypes {
  favorites: IPaginationContextType;
  myPosts: IPaginationContextType;
  allPosts: IPaginationContextType;
}