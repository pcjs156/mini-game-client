import { useQuery } from "@tanstack/react-query";
import { Room } from "types/room";
import { roomService } from "services";
import { CursorPagingResult } from "services/interfaces/IGenericService";

export const useRoom = (afterId?: string, limit: number = 10) => {
  const getRoomsAfter = useQuery<CursorPagingResult<Room>, Error>({
    queryKey: ["rooms", afterId],
    queryFn: async () => {
      const res = await roomService.getAfter(afterId, limit);
      return res;
    },
  });

  return { getRoomsAfter };
};
