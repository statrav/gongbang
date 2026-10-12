import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 프로젝트 소개: src/content/projects/<주소>.md
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // 서비스 이름이 아직 없으면 "이름 미정"처럼 제목 옆에 작게 붙는다
    note: z.string().optional(),
    summary: z.string(),
    status: z.enum(['active', 'paused', 'done']),
    startedAt: z.coerce.date(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

// 제작기: src/content/logs/<주소>.md
const logs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    project: reference('projects'),
    summary: z.string(),
    // true면 npm run dev 에서만 보이고 배포되지 않는다
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, logs };
