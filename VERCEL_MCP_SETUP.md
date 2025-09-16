# Vercel MCP Server 설정 가이드

## 📋 설치 완료된 항목

✅ **Vercel MCP Server** 설정 완료  
✅ **Cursor IDE MCP 설정** 업데이트 완료

## 🚀 Vercel MCP Server란?

[Vercel MCP Server](https://vercel.com/docs/mcp/vercel-mcp)는 Vercel 플랫폼과 상호작용할 수 있는 Model Context Protocol (MCP) 서버입니다. AI 어시스턴트가 Vercel 프로젝트를 관리하고 배포 작업을 수행할 수 있게 해줍니다.

## 🛠️ 사용 가능한 도구들

### 📦 프로젝트 관리
- **프로젝트 생성/조회** - 새 프로젝트 생성 및 기존 프로젝트 정보 확인
- **프로젝트 설정 관리** - 환경 변수, 도메인, 빌드 설정 등
- **팀 관리** - 팀 멤버 및 권한 관리

### 🚀 배포 관리
- **배포 실행** - Git 기반 자동 배포
- **배포 상태 확인** - 배포 진행 상황 및 결과 모니터링
- **배포 롤백** - 이전 버전으로 즉시 롤백

### 🌐 도메인 관리
- **도메인 추가/제거** - 커스텀 도메인 설정
- **DNS 관리** - DNS 레코드 설정 및 관리
- **SSL 인증서** - 자동 SSL 인증서 관리

### 📊 분석 및 모니터링
- **성능 분석** - 웹사이트 성능 메트릭 조회
- **로그 조회** - 배포 및 함수 실행 로그
- **사용량 통계** - 트래픽 및 리소스 사용량

## ⚙️ 설정 상태

### Cursor IDE 설정
```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```

**설정 파일 위치:**
- `/Users/hoambaek/Library/Application Support/Cursor/User/workspaceStorage/[workspace-id]/AndrePimenta.claude-code-chat/mcp/mcp-servers.json`

## 🔐 인증 설정

Vercel MCP Server를 사용하려면 Vercel 계정 인증이 필요합니다:

### 1. Cursor IDE에서 인증
1. **Cursor IDE 재시작** - MCP 서버 설정을 새로고침
2. **인증 프롬프트 대기** - Cursor가 "Needs login" 프롬프트 표시
3. **로그인 클릭** - 프롬프트를 클릭하여 Vercel 계정 인증
4. **브라우저 인증** - Vercel 로그인 페이지에서 계정 인증 완료

### 2. 인증 확인
인증이 완료되면 다음과 같은 작업이 가능합니다:
- "내 Vercel 프로젝트 목록을 보여줘"
- "새 Next.js 프로젝트를 Vercel에 배포해줘"
- "최근 배포 상태를 확인해줘"

## 🎯 프로젝트별 설정 (고급)

더 나은 성능을 위해 프로젝트별 MCP URL을 사용할 수 있습니다:

```
https://mcp.vercel.com/<teamSlug>/<projectSlug>
```

### 장점
- **자동 컨텍스트** - 프로젝트와 팀 정보 자동 제공
- **향상된 성능** - 매개변수 입력 없이 도구 실행
- **오류 감소** - 누락된 프로젝트/팀 정보로 인한 오류 방지

### 팀/프로젝트 슬러그 찾기
1. **Vercel 대시보드에서:**
   - 프로젝트 슬러그: 프로젝트 → Settings → General
   - 팀 슬러그: 팀 → Settings → General

2. **Vercel CLI에서:**
   ```bash
   vercel projects ls
   ```

## 🔒 보안 모범 사례

### 공식 엔드포인트 확인
- 항상 공식 Vercel MCP 엔드포인트 사용: `https://mcp.vercel.com`

### 신뢰할 수 있는 클라이언트
- 신뢰할 수 있는 소스의 MCP 클라이언트만 사용
- Vercel MCP는 사용자 Vercel 계정과 동일한 액세스 권한 부여

### 인간 확인 활성화
- 워크플로우에서 인간 확인을 활성화하여 제어권 유지
- 무단 변경 방지를 위해 각 단계를 검토하고 승인

### 데이터 보호
- 악의적인 지시사항을 포함한 신뢰할 수 없는 도구나 에이전트 주의
- 각 에이전트와 MCP 도구의 권한 및 데이터 액세스 수준 신중히 검토

## 🚀 사용 예시

Cursor IDE에서 다음과 같은 명령을 시도해볼 수 있습니다:

### 기본 명령
- "내 Vercel 프로젝트들을 보여줘"
- "sandtray 프로젝트의 최근 배포 상태는?"
- "새 환경 변수를 추가해줘"

### 배포 관리
- "main 브랜치를 프로덕션에 배포해줘"
- "이전 배포로 롤백해줘"
- "배포 로그를 확인해줘"

### 도메인 관리
- "커스텀 도메인을 추가해줘"
- "DNS 설정을 확인해줘"
- "SSL 인증서 상태는?"

## 📝 다음 단계

1. **Cursor IDE 재시작** - MCP 설정 적용
2. **Vercel 계정 인증** - 브라우저에서 로그인 완료
3. **기능 테스트** - 간단한 명령으로 연결 확인
4. **프로젝트 연동** - 현재 프로젝트와 Vercel 연결

---

**참고 문서:** [Vercel MCP 공식 문서](https://vercel.com/docs/mcp/vercel-mcp)  
**설치 완료 시간:** $(date)  
**MCP 엔드포인트:** https://mcp.vercel.com
