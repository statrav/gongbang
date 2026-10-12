import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getLogs } from '../lib/content';
import { SITE } from '../lib/site';
import { url } from '../lib/url';

export async function GET(context: APIContext) {
  const logs = (await getLogs()).filter((l) => !l.data.draft);
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: logs.map((log) => ({
      title: log.data.title,
      pubDate: log.data.date,
      description: log.data.summary,
      link: url(`/logs/${log.id}/`),
    })),
    customData: '<language>ko</language>',
  });
}
