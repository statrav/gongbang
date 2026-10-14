// era-life의 미니게임(design/*.html)을 블로그 글에서 해 볼 수 있게 public/games/로 옮긴다.
// EMBED 모드로 열어 시안 설명은 숨기고, 끝나면 다시 할 수 있게 "다시" 단추만 보인다.
//   node scripts/copy-era-life-games.mjs   (workspace/era-life가 옆 폴더에 있어야 한다)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '..', 'era-life', 'design');
const out = join(root, 'public', 'games');
const GAMES = ['dalgona', 'gonggi', 'ddakji', 'yeot', 'pager', 'minicar', 'spintop', 'sticker'];

mkdirSync(out, { recursive: true });
for (const g of GAMES) {
  const html = readFileSync(join(src, `${g}.html`), 'utf8').replaceAll(' (시안에서만)', '').replace(/<title>(.*?) 시안<\/title>/, '<title>$1</title>');
  const head = [
    '<!doctype html>', '<html lang="ko">', '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<!-- era-life design/${g}.html을 블로그에서 해 보도록 EMBED 모드로 옮긴 것. 끝나면 다시 할 수 있게 다시 단추를 보인다 -->`,
    '<script>window.EMBED = { era: null }</script>',
    '<style>html.embed body #again { display: revert !important; }</style>', '',
  ].join('\n');
  writeFileSync(join(out, `${g}.html`), head + html);
}
console.log(`${GAMES.length}개를 public/games/에 옮겼습니다`);
