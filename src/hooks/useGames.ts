import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { FetchResponse } from "../services/api-client";
import { Genre } from "./useGenres";
import { GameQuery } from "../App";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Platform } from "./usePlatforms";


export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<FetchResponse<Game>,Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({pageParam=1}) =>
      apiClient
        .get<FetchResponse<Game>>("/games", {
          params: {
            genres: gameQuery.genreId,
            parent_platforms: gameQuery.platformId,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
            page: pageParam
          },
        })
        .then((res) => res.data),

        getNextPageParam:(lastPage,allPages)=>{
          return lastPage.next ? allPages.length +1 :undefined;
        },
        staleTime: 24*60*60*1000

  });

export default useGames;
