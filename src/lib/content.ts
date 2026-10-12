import { getCollection } from 'astro:content';

const showDrafts = import.meta.env.DEV;

export async function getProjects() {
  const all = await getCollection('projects', (p) => showDrafts || !p.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getLogs() {
  const all = await getCollection('logs', (l) => showDrafts || !l.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const STATUS_LABEL = { active: '작업 중', paused: '쉬는 중', done: '완성' } as const;
