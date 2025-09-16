import { NextRequest, NextResponse } from 'next/server';
import { CloudflareR2Storage } from '@/lib/r2';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const decodedKey = decodeURIComponent(key);
    
    const result = await CloudflareR2Storage.downloadFile(decodedKey);

    if (result.success && result.data) {
      return new NextResponse(new Uint8Array(result.data), {
        headers: {
          'Content-Type': result.contentType || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${decodedKey}"`,
        },
      });
    } else {
      return NextResponse.json(
        { error: result.error || '파일을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('다운로드 API 오류:', error);
    return NextResponse.json(
      { error: '파일 다운로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const decodedKey = decodeURIComponent(key);
    
    const result = await CloudflareR2Storage.deleteFile(decodedKey);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: '파일이 성공적으로 삭제되었습니다.',
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('삭제 API 오류:', error);
    return NextResponse.json(
      { error: '파일 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
