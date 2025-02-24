import { Identifiable, UUID } from "types";
import { CursorPagingResult, IGenericService } from "services/interfaces/IGenericService";
import { supabase } from "../../lib/supabaseClient";

export class SupabaseGenericService<T extends Identifiable> implements IGenericService<T> {
  tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected transformResponse(data: any): T {
    const result = { ...data, id: data.uuid };
    delete result.uuid;
    return result as T;
  }

  getById(id: UUID): Promise<T | null> {
    return new Promise<T | null>((resolve, reject) => {
      supabase
        .from(this.tableName)
        .select("*")
        .eq("uuid", id)
        .single()
        .then((response) => {
          if (response.error) {
            return reject(response.error);
          } else if (!response.data) {
            return resolve(null);
          } else {
            return resolve(this.transformResponse(response.data));
          }
        });
    });
  }

  getAfter(afterId: UUID | undefined, _limit: number | undefined): Promise<CursorPagingResult<T>> {
    const afterPromise = afterId ? this.getInternalId(afterId) : this.getFirstInternalId();
    const limit = (_limit || 10) + 1;

    return new Promise<CursorPagingResult<T>>((resolve, reject) => {
      afterPromise
        .then((afterCursorId) => {
          if (afterCursorId === null) {
            return resolve({ data: [], hasNext: false });
          }

          supabase
            .from(this.tableName)
            .select("*")
            .gt("id", afterCursorId)
            .order("id", { ascending: true })
            .limit(limit)
            .then((response) => {
              if (response.error) {
                return reject(response.error);
              } else {
                const data = response.data.map((item) => this.transformResponse(item));
                const hasNext = data.length === limit;
                if (hasNext) {
                  data.pop(); // 다음 페이지가 있는지 확 추가로 조회한 하나의 항목을 제거
                }
                return resolve({ data, hasNext });
              }
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getFirstInternalId(): Promise<number | null> {
    return new Promise<number | null>((resolve, reject) => {
      supabase
        .from(this.tableName)
        .select("id")
        .order("id", { ascending: true })
        .limit(1)
        .single()
        .then((response) => {
          if (response.error) {
            return reject(response.error);
          } else if (!response.data) {
            return resolve(null);
          } else {
            return resolve(response.data.id);
          }
        });
    });
  }

  getInternalId(externalId: UUID): Promise<number | null> {
    return new Promise<number | null>((resolve, reject) => {
      supabase
        .from(this.tableName)
        .select("id")
        .eq("uuid", externalId)
        .single()
        .then((response) => {
          if (response.error) {
            return reject(response.error);
          } else if (!response.data) {
            return resolve(null);
          } else {
            return resolve(response.data.id);
          }
        });
    });
  }
}
