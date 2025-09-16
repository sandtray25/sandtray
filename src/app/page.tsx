import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Image
            className="dark:invert mx-auto"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold">Next.js + shadcn/ui + MCP + R2</h1>
          <p className="text-muted-foreground">
            Next.js 15, shadcn/ui, GitHub/Vercel MCP Server, Web Analytics, Cloudflare R2가 모두 설치되었습니다!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Next.js 15</CardTitle>
              <CardDescription>
                최신 버전의 Next.js와 React 19가 설치되었습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ App Router</li>
                <li>✅ TypeScript</li>
                <li>✅ Tailwind CSS v4</li>
                <li>✅ Turbopack</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 shadcn/ui</CardTitle>
              <CardDescription>
                아름답고 접근성이 좋은 컴포넌트 라이브러리입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Radix UI 기반</li>
                <li>✅ 완전 커스터마이징 가능</li>
                <li>✅ 다크 모드 지원</li>
                <li>✅ TypeScript 지원</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Vercel Analytics</CardTitle>
              <CardDescription>
                실시간 웹 분석 및 성능 모니터링 도구입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Web Analytics</li>
                <li>✅ Speed Insights</li>
                <li>✅ 실시간 데이터</li>
                <li>✅ 성능 최적화 힌트</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>☁️ Cloudflare R2</CardTitle>
              <CardDescription>
                S3 호환 오브젝트 스토리지 서비스입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ S3 호환 API</li>
                <li>✅ 무료 송신 트래픽</li>
                <li>✅ 글로벌 CDN</li>
                <li>✅ 파일 업로드/다운로드</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            shadcn/ui 컴포넌트 테스트
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button>기본 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="outline">아웃라인 버튼</Button>
            <Button variant="destructive">삭제 버튼</Button>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">Cloudflare R2 파일 스토리지 테스트</h2>
          <FileUpload maxSizeMB={10} />
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>다음 단계</CardTitle>
            <CardDescription>
              이제 개발을 시작할 준비가 되었습니다!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Button variant="outline" asChild>
                <a 
                  href="https://ui.shadcn.com/docs/components" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  shadcn/ui 문서
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a 
                  href="https://nextjs.org/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Next.js 문서
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a 
                  href="https://developers.cloudflare.com/r2/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Cloudflare R2 문서
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a 
                  href="https://vercel.com/docs/analytics" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Vercel Analytics
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
