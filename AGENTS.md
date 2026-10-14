# AGENTS.md

## Cursor Cloud specific instructions

이 저장소는 백엔드/DB가 없는 단일 정적 프론트엔드 SPA입니다 (React 19 + TypeScript + Vite 6 + Tailwind CSS v4, 패키지 매니저는 npm). 미소금융대구중구법인 공식 홈페이지입니다.

- 표준 명령은 `package.json` scripts와 `README.md`를 참고하세요. 핵심: `npm run dev`(개발 서버), `npm run build`(빌드), `npm run lint`(타입체크).
- 개발 서버는 `npm run dev`로 실행하며 `vite --port=3000 --host=0.0.0.0` 이므로 **포트 3000**에서 뜹니다.
- Lint은 ESLint가 아니라 `tsc --noEmit`(타입체크)입니다. 자동화된 테스트 스위트(test runner)는 없습니다.
- 환경변수/시크릿이 필요 없습니다. API 호출·DB·백엔드가 없는 순수 클라이언트 사이드 사이트입니다.
- `vite.config.ts`에는 `DISABLE_HMR=true` 옵션이 있어 HMR/파일 감시를 끌 수 있습니다(기능과 무관, CPU 절약용). 일반 개발 시에는 설정할 필요 없습니다.
