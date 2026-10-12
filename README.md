# 퇴근 후 공방

사이드 프로젝트 소개와 제작기를 담는 정적 블로그. Astro로 만들고 GitHub Pages(`statrav.github.io/gongbang`)에 올린다.

## 명령

```
npm install
npm run dev        # http://localhost:4321/gongbang/  (초안도 보임)
npm run build      # dist/ 에 정적 파일 (초안 제외)
npm run preview    # 빌드 결과 확인
```

## 글 쓰기

| 무엇 | 위치 | 주소 |
|---|---|---|
| 프로젝트 소개 | `src/content/projects/<주소>.md` | `/gongbang/projects/<주소>/` |
| 제작기 | `src/content/logs/<주소>.md` | `/gongbang/logs/<주소>/` |

파일 이름이 주소가 된다. 한 번 올린 글의 파일 이름은 바꾸지 않는다 (링크가 깨진다).

제작기 머리말:

```yaml
---
title: 글 제목
date: 2026-10-12
project: ledger          # src/content/projects/ 의 파일 이름
summary: 목록과 검색 결과에 나오는 한 줄
draft: true              # 다 쓰면 지운다. true면 배포되지 않는다
---
```

- 캡처는 반드시 가상 데이터로 찍는다 (account-pro: `npm run db:demo` → `npm run dev:demo`)
- 본문에서 `<mark>강조</mark>`는 형광펜으로 나온다

## 화면

시안 A "모눈 작업노트"(https://claude.ai/artifact/2ixe4nUH3qxjK9ztM494f9)를 골랐다. 색·글꼴·간격은 `src/styles/tokens.css` 한 곳에 있고, 화면 코드는 그 이름만 쓴다.

- 제목: 함렛(`@fontsource-variable/hahmlet`), 본문: IBM Plex Sans KR. 둘 다 npm 패키지로 함께 배포한다 (외부 글꼴 서버 안 씀)
- 한글은 어절 단위로 줄바꿈 (`word-break: keep-all`)
- 어두운 모드는 기기 설정을 따른다

## 배포

`main`에 올리면 `.github/workflows/deploy.yml`이 빌드해서 GitHub Pages로 배포한다.

처음 한 번:

1. GitHub에 `statrav/gongbang` 저장소를 만든다 (공개)
2. 저장소 Settings → Pages → Source를 **GitHub Actions**로
3. 이 폴더를 그 저장소의 `main`으로 올린다

주소 경로는 `astro.config.mjs`의 `base` 한 줄로 정한다. 내부 링크는 모두 `src/lib/url.ts`의 `url()`을 거치므로, 나중에 개인 도메인이나 다른 경로로 옮겨도 그 줄만 바꾸면 된다.
