import { unstable_cache } from "next/cache";

import { GITHUB } from "@/constants/links";

interface Stargazer {
  login: string;
  avatar_url: string;
}

export const getStargazers = unstable_cache(
  async (): Promise<Stargazer[]> => {
    try {
      const pageResults = await Promise.all(
        Array.from({ length: 5 }, (_, index) => {
          const page = index + 1;
          return fetch(
            `https://api.github.com/repos/${GITHUB.user}/${GITHUB.repo}/stargazers?per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          ).then(async (response) => {
            if (!response.ok) {
              return null;
            }
            return (await response.json()) as Stargazer[];
          });
        })
      );

      const pages: Stargazer[] = [];
      for (const data of pageResults) {
        if (data === null || data.length === 0) {
          break;
        }
        pages.push(...data);
        if (data.length < 100) {
          break;
        }
      }

      return pages.filter((s) => s.login !== GITHUB.user);
    } catch {
      return [];
    }
  },
  ["github-stargazers"],
  { revalidate: 86_400 }
);

export const getStargazerCount = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB.user}/${GITHUB.repo}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (!response.ok) {
        return 0;
      }

      const json = (await response.json()) as { stargazers_count?: number };
      return Number(json.stargazers_count) || 0;
    } catch {
      return 0;
    }
  },
  ["github-stargazer-count"],
  { revalidate: 86_400 }
);
