interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string;
}

interface IPaginationResponse<T> {
  page: number;
  totalPage: number;
  limit: number;
  itemsFound: number;
  data: T[];
}

export type { IQuery, IPaginationResponse };
