# GitHub MCP Server 설정 가이드

## 📋 설치 완료된 항목

✅ **GitHub MCP Server v0.15.0** 설치 완료  
✅ **MCP 설정 파일** 생성 완료 (`~/.cursor/mcp/mcp_settings.json`)

## 🔑 GitHub Personal Access Token 설정

### 1. GitHub Token 생성

1. [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)로 이동
2. "Generate new token" → "Generate new token (classic)" 선택
3. Token 이름 입력 (예: "GitHub MCP Server")
4. **필요한 권한 선택:**
   - ✅ `repo` - 전체 저장소 액세스
   - ✅ `read:org` - 조직 정보 읽기  
   - ✅ `read:user` - 사용자 정보 읽기
   - ✅ `read:project` - 프로젝트 읽기
   - ✅ `workflow` - GitHub Actions 워크플로우 (선택사항)
5. "Generate token" 클릭
6. **생성된 토큰을 안전한 곳에 복사** (다시 볼 수 없음)

### 2. 환경 변수 설정

터미널에서 다음 명령어를 실행하여 환경 변수를 설정하세요:

\`\`\`bash
# ~/.zshrc 파일에 추가 (영구적 설정)
echo 'export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_your_token_here"' >> ~/.zshrc
source ~/.zshrc

# 또는 현재 세션에만 설정 (임시)
export GITHUB_PERSONAL_ACCESS_TOKEN="ghp_your_token_here"
\`\`\`

**⚠️ 주의:** `ghp_your_token_here`를 실제 생성한 토큰으로 교체하세요.

## 🚀 사용 가능한 도구들

GitHub MCP Server는 다음과 같은 도구들을 제공합니다:

### 📁 Repository 관리
- `create_repository` - 새 저장소 생성
- `get_repository` - 저장소 정보 조회
- `list_repositories` - 저장소 목록 조회
- `update_repository` - 저장소 설정 수정
- `delete_repository` - 저장소 삭제

### 🐛 Issue 관리  
- `create_issue` - 새 이슈 생성
- `get_issue` - 이슈 정보 조회
- `list_issues` - 이슈 목록 조회
- `update_issue` - 이슈 수정
- `add_issue_comment` - 이슈 댓글 추가

### 🔀 Pull Request 관리
- `create_pull_request` - PR 생성
- `get_pull_request` - PR 정보 조회
- `list_pull_requests` - PR 목록 조회
- `update_pull_request` - PR 수정
- `merge_pull_request` - PR 병합

### ⚡ GitHub Actions
- `list_workflows` - 워크플로우 목록
- `get_workflow_run` - 워크플로우 실행 정보
- `list_workflow_runs` - 워크플로우 실행 목록

### 🔒 보안 관리
- `list_repository_security_advisories` - 보안 권고사항 목록
- `create_security_advisory` - 보안 권고사항 생성

## 🧪 설치 테스트

토큰 설정 후 다음 명령어로 테스트할 수 있습니다:

\`\`\`bash
# GitHub MCP Server 실행 테스트
~/.local/bin/github-mcp-server --help

# 읽기 전용 모드로 테스트
~/.local/bin/github-mcp-server --read-only --toolsets repos
\`\`\`

## 📖 추가 정보

- **공식 문서:** [GitHub MCP Server](https://github.com/github/github-mcp-server)
- **설치 위치:** `~/.local/bin/github-mcp-server`
- **설정 파일:** `~/.cursor/mcp/mcp_settings.json`
- **버전:** v0.15.0

## 🔧 문제 해결

### Token 관련 오류
- 토큰이 올바르게 설정되었는지 확인: `echo $GITHUB_PERSONAL_ACCESS_TOKEN`
- 토큰 권한이 충분한지 GitHub에서 확인
- 토큰이 만료되지 않았는지 확인

### MCP 연결 오류  
- Cursor IDE를 재시작해보세요
- MCP 설정 파일 경로가 올바른지 확인
- 바이너리 실행 권한 확인: `ls -la ~/.local/bin/github-mcp-server`

---

💡 **팁:** Cursor IDE에서 MCP 서버가 활성화되면 GitHub 관련 작업을 자연어로 요청할 수 있습니다!
