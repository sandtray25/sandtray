# Cloudflare R2 스토리지 설정 가이드

## 📋 설치 완료된 항목

✅ **AWS SDK for S3** 설치 완료 (R2 호환)  
✅ **Cloudflare R2 클라이언트** 라이브러리 구현  
✅ **파일 업로드/다운로드 API** 구현  
✅ **React 파일 업로드 컴포넌트** 생성  
✅ **Wrangler CLI** 설치 완료

## 🏗️ 구현된 기능들

### 1. Cloudflare R2 클라이언트 (`src/lib/r2.ts`)
- **파일 업로드** - `uploadFile(key, file, contentType)`
- **파일 다운로드** - `downloadFile(key)`
- **파일 삭제** - `deleteFile(key)`
- **파일 목록 조회** - `listFiles(prefix, maxKeys)`
- **서명된 URL 생성** - `getSignedUrl(key, expiresIn, operation)`

### 2. API 라우트
- **업로드 API** - `POST /api/r2/upload`
- **다운로드 API** - `GET /api/r2/download/[key]`
- **삭제 API** - `DELETE /api/r2/download/[key]`
- **파일 목록 API** - `GET /api/r2/upload`

### 3. React 컴포넌트
- **FileUpload 컴포넌트** - 드래그 앤 드롭 파일 업로드
- **실시간 업로드 상태** - 진행률 및 성공/실패 표시
- **파일 검증** - 크기 및 타입 제한
- **미리보기 기능** - 업로드된 파일 링크

## ⚙️ 필요한 환경 변수 설정

### Cloudflare R2 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# Cloudflare R2 Storage 설정
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-access-key
CLOUDFLARE_R2_BUCKET_NAME=your-bucket-name
CLOUDFLARE_R2_PUBLIC_URL=https://your-bucket.your-domain.com
```

## 🔧 Cloudflare 대시보드 설정

### 1단계: Cloudflare 계정 및 R2 버킷 생성

1. **Cloudflare 대시보드** 접속
   - [https://dash.cloudflare.com/](https://dash.cloudflare.com/) 로그인

2. **R2 Object Storage** 활성화
   - 좌측 메뉴에서 "R2 Object Storage" 선택
   - "Create bucket" 클릭

3. **버킷 생성**
   - **버킷 이름** 입력 (예: `sandtray-files`)
   - **지역** 선택 (자동 또는 특정 지역)
   - "Create bucket" 클릭

### 2단계: API 토큰 생성

1. **API 토큰 페이지** 이동
   - 우측 상단 프로필 → "My Profile" → "API Tokens"

2. **R2 토큰 생성**
   - "Create Token" 클릭
   - "Custom token" 선택
   - **토큰 이름:** `R2 Storage Token`
   - **권한 설정:**
     - `Cloudflare R2:Edit` - 모든 계정 리소스에 대해
   - "Continue to summary" → "Create Token"

3. **토큰 정보 저장**
   - 생성된 토큰을 안전한 곳에 복사
   - Access Key ID와 Secret Access Key 기록

### 3단계: 공개 도메인 설정 (선택사항)

1. **커스텀 도메인 연결**
   - R2 버킷 설정에서 "Custom domains" 탭
   - 소유한 도메인을 버킷에 연결
   - DNS 설정에서 CNAME 레코드 추가

2. **공개 액세스 설정**
   - 버킷 설정에서 "Public access" 활성화
   - 필요에 따라 특정 경로만 공개 설정

## 🚀 MCP 서버 연동 (선택사항)

Cloudflare는 Workers를 통한 MCP 서버 배포를 지원합니다:

### Cloudflare Workers MCP 서버 생성

```bash
# 새 Workers 프로젝트 생성
wrangler generate my-mcp-server https://github.com/cloudflare/mcp-server-template

# 프로젝트 디렉토리 이동
cd my-mcp-server

# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# Cloudflare에 배포
npm run deploy
```

### MCP 서버에 R2 기능 추가

```typescript
// worker.ts 예시
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // R2 버킷 연결
    const bucket = env.MY_BUCKET;
    
    // MCP 프로토콜 구현
    if (request.method === 'POST') {
      // 파일 업로드 처리
      const formData = await request.formData();
      const file = formData.get('file') as File;
      
      await bucket.put(file.name, file.stream());
      
      return new Response(JSON.stringify({ success: true }));
    }
    
    return new Response('MCP Server Running');
  }
};
```

## 📊 사용 예시

### 파일 업로드

```typescript
import { uploadToR2 } from '@/lib/r2';

const handleUpload = async (file: File) => {
  const result = await uploadToR2(
    `uploads/${file.name}`,
    await file.arrayBuffer(),
    file.type
  );
  
  if (result.success) {
    console.log('업로드 완료:', result.url);
  }
};
```

### 파일 다운로드

```typescript
import { downloadFromR2 } from '@/lib/r2';

const handleDownload = async (key: string) => {
  const result = await downloadFromR2(key);
  
  if (result.success && result.data) {
    // 파일 데이터 처리
    const blob = new Blob([result.data], { 
      type: result.contentType 
    });
    // 다운로드 링크 생성 등
  }
};
```

### 서명된 URL 생성

```typescript
import { getR2SignedUrl } from '@/lib/r2';

const getDownloadUrl = async (key: string) => {
  const result = await getR2SignedUrl(key, 3600); // 1시간 유효
  
  if (result.success) {
    return result.url; // 임시 다운로드 URL
  }
};
```

## 🔒 보안 고려사항

### 1. 환경 변수 보안
- `.env.local` 파일을 `.gitignore`에 추가
- 프로덕션에서는 Vercel 환경 변수 사용
- API 토큰을 코드에 직접 포함하지 않음

### 2. 파일 업로드 제한
- 파일 크기 제한 설정 (기본 10MB)
- 허용된 파일 타입만 업로드 허용
- 파일명 검증 및 정리

### 3. 접근 권한 관리
- 버킷별 세분화된 권한 설정
- 필요에 따라 서명된 URL 사용
- 공개/비공개 파일 분리

## 💰 비용 최적화

### Cloudflare R2 장점
- **무료 송신 트래픽** - 다른 클라우드 대비 큰 장점
- **저렴한 스토리지 비용** - GB당 $0.015
- **무료 할당량** - 월 10GB 스토리지, 100만 요청

### 최적화 팁
- **압축 활용** - 이미지 최적화 및 압축
- **캐싱 전략** - CDN을 통한 전역 캐싱
- **생명주기 정책** - 오래된 파일 자동 삭제

## 🔗 유용한 링크

- **Cloudflare R2 문서:** https://developers.cloudflare.com/r2/
- **AWS SDK for JavaScript:** https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/
- **Wrangler CLI 문서:** https://developers.cloudflare.com/workers/wrangler/
- **MCP 프로토콜:** https://spec.modelcontextprotocol.io/

---

**다음 단계:** 환경 변수를 설정하고 Cloudflare 대시보드에서 R2 버킷을 생성하세요! 🚀
