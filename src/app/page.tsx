import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
          <h1 className="text-4xl font-bold">Next.js + shadcn/ui</h1>
          <p className="text-muted-foreground">
            Next.js 15와 shadcn/ui가 성공적으로 설치되었습니다!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <Card className="text-center">
          <CardHeader>
            <CardTitle>다음 단계</CardTitle>
            <CardDescription>
              이제 개발을 시작할 준비가 되었습니다!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="outline" asChild>
                <a 
                  href="https://ui.shadcn.com/docs/components" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  컴포넌트 문서
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
                  href="https://tailwindcss.com/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Tailwind 문서
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
