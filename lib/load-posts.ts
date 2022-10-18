import type { News } from "../pages/sub/news";

export async function loadPosts() {
  const res = await fetch("https://api.hnpwa.com/v0/news/1.json");
  const data: News[] = await res.json();

  return data;
}
