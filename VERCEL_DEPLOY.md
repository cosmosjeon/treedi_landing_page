# Vercel 배포 가이드

## 1. 환경 변수 설정

### 로컬 개발용
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 변수들을 추가하세요:

```bash
# Next.js 앱 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 커스텀 환경 변수 (필요시 추가)
CUSTOM_KEY=your_custom_value

# API 키나 데이터베이스 URL 등 (필요시)
# DATABASE_URL=your_database_url
# API_KEY=your_api_key
```

### Vercel 배포용
Vercel 대시보드에서 환경 변수를 설정하세요:

1. Vercel 프로젝트 대시보드 접속
2. Settings → Environment Variables
3. 다음 변수들을 추가:
   - `NEXT_PUBLIC_APP_URL`: 배포된 도메인 URL
   - 기타 필요한 환경 변수들

## 2. 배포 방법

### 방법 1: GitHub 연결 (권장)
1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에 로그인
3. "New Project" → GitHub 레포지토리 선택
4. 자동 배포 완료

### 방법 2: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 배포
vercel

# 프로덕션 배포
vercel --prod
```

## 3. 배포 전 체크리스트

- [x] `package.json`에 빌드 스크립트 확인
- [x] `vercel.json` 설정 완료
- [x] `next.config.mjs` 최적화 완료
- [x] `.gitignore`에 환경 변수 파일 제외 설정
- [ ] 로컬에서 `npm run build` 테스트
- [ ] 환경 변수 설정 확인

## 4. 설정된 최적화

- **성능 최적화**: SWC 컴파일러, 압축 활성화
- **보안 헤더**: XSS, Content-Type, Frame 보호
- **이미지 최적화**: WebP, AVIF 형식 지원
- **번들 최적화**: Lucide React, Radix UI 최적화
- **지역 설정**: 서울 리전(icn1) 설정

## 5. 문제 해결

### 빌드 실패 시
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 빌드 테스트
npm run build
```

### 환경 변수 인식 안됨
- `NEXT_PUBLIC_` 접두사가 있는 변수만 클라이언트에서 접근 가능
- 서버 사이드 변수는 `NEXT_PUBLIC_` 없이 사용

### 이미지 로딩 문제
- `next/image` 컴포넌트 사용 권장
- 외부 이미지는 `next.config.mjs`의 `domains`에 추가

## 6. Analytics 설정

프로젝트에 이미 `@vercel/analytics`가 설치되어 있습니다. 
Vercel 배포 후 자동으로 활성화됩니다.
