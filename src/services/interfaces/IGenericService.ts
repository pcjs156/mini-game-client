import { Identifiable, UUID } from "types";

export interface CursorPagingResult<T> {
  data: T[];
  hasNext: boolean;
}

export interface IGenericService<T extends Identifiable> {
  getById(id: UUID): Promise<T | null>;
  getAfter(afterId: UUID | undefined, _limit: number | undefined): Promise<CursorPagingResult<T>>;
}
