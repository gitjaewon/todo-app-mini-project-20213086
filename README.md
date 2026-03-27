# Todo App Mini Project

간단한 Todo 리스트 앱입니다. 프론트엔드는 React(CRA), 백엔드는 Express + MongoDB(Mongoose)로 구성되어 있고, 배포 시에는 Vercel의 정적 프론트 + 서버리스 API 형태로 동작합니다.

## 기능

- Todo 목록 조회
- Todo 추가
- 완료 상태 토글
- Todo 삭제

## 프로젝트 구조

```text
.
├─ api/                 # Vercel 서버리스 함수 엔트리
├─ backend/             # Express + Mongoose API
├─ frontend/            # React 앱
└─ vercel.json          # 루트 기준 Vercel 빌드 설정
```

## 기술 스택

- Frontend: React 18, axios, react-scripts
- Backend: Express 5, Mongoose, dotenv, cors
- Deploy: Vercel
- Database: MongoDB Atlas

## 로컬 실행 방법

### 1) 의존성 설치

```bash
npm install --prefix frontend
npm install --prefix backend
```

### 2) 환경변수 설정

`backend/.env` 또는 실행 환경에 아래 값을 준비합니다.

```env
MONGODB_URI=your-mongodb-connection-string
PORT=5000
```

루트의 `.env.example` 파일을 복사해서 값을 채운 뒤 사용하면 됩니다.

```bash
cp .env.example .env
```

Windows에서는 파일을 직접 복사해서 `.env`로 이름만 바꿔도 됩니다.

## 3) 백엔드 실행

```bash
node backend/index.js
```

기본 포트는 `5000`입니다.

## 4) 프론트엔드 실행

```bash
npm start --prefix frontend
```

기본 포트는 `3000`입니다.

프론트엔드는 `frontend/package.json`의 `proxy` 설정을 통해 로컬에서 `/api/todos` 요청을 `http://localhost:5000`으로 전달합니다.

## API 엔드포인트

- `GET /api/todos` - 전체 목록 조회
- `POST /api/todos` - Todo 추가
- `PUT /api/todos/:id` - 완료 상태 토글
- `DELETE /api/todos/:id` - Todo 삭제

> 참고: `GET /api/todos/:id` 엔드포인트는 구현되어 있지 않습니다.

## 배포

이 프로젝트는 루트에서 Vercel로 배포되도록 맞춰져 있습니다.

```bash
vercel
vercel --prod
```

현재 `vercel.json`은 다음 동작을 기준으로 설정되어 있습니다.

- 루트에서 `frontend`와 `backend` 의존성 설치
- 루트에서 `frontend` 빌드 실행
- `frontend/build`를 정적 출력물로 사용
- `api/` 아래 파일들을 서버리스 함수로 사용

### Vercel 환경변수

Vercel 프로젝트에 아래 환경변수를 설정해야 합니다.

```env
MONGODB_URI=your-mongodb-connection-string
```

이 프로젝트는 프론트엔드가 `/api/todos` 상대경로를 사용하므로, 현재 기준으로는 별도의 `REACT_APP_*` 배포 환경변수가 필요하지 않습니다. 즉 Vercel에는 `MONGODB_URI`만 넣으면 됩니다.

## 주의사항

- 서버리스 환경 특성상 첫 요청은 느릴 수 있습니다.
- Vercel 함수 리전과 MongoDB Atlas 리전이 멀면 응답 속도가 더 느려질 수 있습니다.
- 민감한 `.env`, `.vercel`, 실제 DB 접속 문자열은 저장소에 커밋하지 않는 것을 권장합니다.
