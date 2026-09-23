# 별결 — 나를 읽는 시간

한국어 사주 서비스의 반응형 프런트엔드 데모입니다. `index.html`을 브라우저에서 열면 실행됩니다. 별도 설치나 빌드가 필요 없습니다.

## 개발 서버 실행

Node.js 18 이상에서 프로젝트 폴더를 열고 실행하세요. 외부 패키지 설치는 필요 없습니다.

```sh
npm run dev
```

PowerShell에서 `npm.ps1` 실행 정책 오류가 발생하면 `npm.cmd run dev`를 사용하세요. 보안 정책 변경 없이 동일한 npm 명령을 실행합니다.

브라우저에서 http://localhost:5173 을 여세요. 파일 수정 후 브라우저를 새로고침하면 반영됩니다. 종료는 `Ctrl+C`입니다.

포트가 사용 중이라면 `npm.cmd run dev -- --port 5174`로 변경할 수 있습니다.

## GitHub Actions 배포

`.github/workflows/deploy-pages.yml`은 `main` 브랜치에 push할 때 GitHub Pages로 자동 배포합니다. Actions 탭에서 수동 실행도 가능합니다. 공식 GitHub Pages Actions와 기본 제공 `GITHUB_TOKEN`을 사용하므로 별도 배포 토큰은 필요하지 않습니다.

최초 한 번 저장소 [Settings → Pages](https://github.com/yubinro/personal_/settings/pages)의 **Build and deployment → Source**를 **GitHub Actions**로 선택하세요. 그런 다음 워크플로 파일을 포함한 변경 사항을 커밋하고 `main`으로 push하세요.

배포 진행 상태는 [Actions](https://github.com/yubinro/personal_/actions)에서 확인합니다. 성공 후 기본 배포 주소는 https://yubinro.github.io/personal_/ 입니다. 저장소의 공개 여부와 GitHub 플랜에 따라 Pages 사용 가능 여부가 달라집니다.

배포 파일은 `index.html`, `style.css`, `app.js` 세 개입니다. Node 개발 서버는 로컬 실행용이며 GitHub Pages에는 정적 파일만 게시합니다. CSS와 JavaScript는 상대 경로로 불러오므로 저장소 하위 경로에서도 동작합니다.

## 기능

- 양력 생년월일, 출생 시간, 닉네임 입력
- 미래 날짜 제한, 필수 입력 검증, 출생 시간 모름 선택
- 입력에 따라 다섯 가지 사전 작성 예시 중 하나 표시
- 결과 텍스트 파일 다운로드
- 모바일 레이아웃, 키보드 포커스, 동작 줄이기 설정 지원

## 범위

실제 AI 또는 만세력 계산을 연결하지 않은 체험용 화면입니다. 결과는 운세나 실제 사주 명식이 아니며 화면에도 이를 안내합니다. 실제 서비스로 확장하려면 검증된 만세력 엔진과 서버 측 AI API 연동이 필요합니다. API 키를 브라우저 코드에 넣지 마세요.

입력값은 현재 페이지 메모리에서만 사용하며 저장하거나 서버로 보내지 않습니다. 폰트는 Google Fonts에서 불러오며 오프라인에서는 시스템 글꼴로 표시됩니다. 천체 그림은 CSS와 인라인 SVG 텍스처로 구성되어 별도 이미지 파일이 필요 없습니다.
