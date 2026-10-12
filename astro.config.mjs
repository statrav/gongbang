// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// statrav.github.io/gongbang 에 올린다 (저장소 이름 = gongbang).
// 나중에 루트나 다른 경로로 옮기면 base 한 줄만 바꾸면 된다. 링크는 모두 src/lib/url.ts 를 거친다.
export default defineConfig({
  site: 'https://statrav.github.io',
  base: '/gongbang',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
