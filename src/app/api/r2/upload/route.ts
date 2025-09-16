import { NextRequest, NextResponse } from 'next/server';
import { CloudflareR2Storage } from '@/lib/r2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 파일을 Buffer로 변환
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 파일명 생성 (타임스탬프 + 원본 파일명)
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;

    // R2에 업로드
    const result = await CloudflareR2Storage.uploadFile(
      fileName,
      buffer,
      file.type
    );

    if (result.success) {
      return NextResponse.json({
        success: true,
        url: result.url,
        fileName: fileName,
        size: file.size,
        type: file.type,
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('업로드 API 오류:', error);
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get('prefix') || undefined;
    const maxKeys = searchParams.get('maxKeys') 
      ? parseInt(searchParams.get('maxKeys')!) 
      : undefined;

    const result = await CloudflareR2Storage.listFiles(prefix, maxKeys);

    if (result.success) {
      return NextResponse.json({
        success: true,
        files: result.files,
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('파일 목록 조회 API 오류:', error);
    return NextResponse.json(
      { error: '파일 목록 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
