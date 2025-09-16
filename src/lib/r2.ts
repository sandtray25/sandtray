import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Cloudflare R2 클라이언트 설정
const r2Client = new S3Client({
  region: 'auto', // Cloudflare R2는 'auto' 리전 사용
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT, // https://your-account-id.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || '';

export class CloudflareR2Storage {
  /**
   * 파일을 R2에 업로드
   */
  static async uploadFile(
    key: string,
    file: Buffer | Uint8Array | string,
    contentType?: string
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: contentType || 'application/octet-stream',
      });

      await r2Client.send(command);
      
      return {
        success: true,
        url: `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`,
      };
    } catch (error) {
      console.error('R2 업로드 오류:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      };
    }
  }

  /**
   * 파일을 R2에서 다운로드
   */
  static async downloadFile(key: string): Promise<{ 
    success: boolean; 
    data?: Buffer; 
    contentType?: string;
    error?: string 
  }> {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });

      const response = await r2Client.send(command);
      const data = await response.Body?.transformToByteArray();

      return {
        success: true,
        data: data ? Buffer.from(data) : undefined,
        contentType: response.ContentType,
      };
    } catch (error) {
      console.error('R2 다운로드 오류:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      };
    }
  }

  /**
   * 파일을 R2에서 삭제
   */
  static async deleteFile(key: string): Promise<{ success: boolean; error?: string }> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });

      await r2Client.send(command);
      
      return { success: true };
    } catch (error) {
      console.error('R2 삭제 오류:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      };
    }
  }

  /**
   * 파일 목록 조회
   */
  static async listFiles(prefix?: string, maxKeys?: number): Promise<{
    success: boolean;
    files?: Array<{ key: string; size: number; lastModified: Date }>;
    error?: string;
  }> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: prefix,
        MaxKeys: maxKeys || 1000,
      });

      const response = await r2Client.send(command);
      const files = response.Contents?.map(item => ({
        key: item.Key || '',
        size: item.Size || 0,
        lastModified: item.LastModified || new Date(),
      })) || [];

      return {
        success: true,
        files,
      };
    } catch (error) {
      console.error('R2 목록 조회 오류:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      };
    }
  }

  /**
   * 서명된 URL 생성 (임시 접근 URL)
   */
  static async getSignedUrl(
    key: string, 
    expiresIn: number = 3600, // 기본 1시간
    operation: 'getObject' | 'putObject' = 'getObject'
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const command = operation === 'getObject' 
        ? new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key })
        : new PutObjectCommand({ Bucket: BUCKET_NAME, Key: key });

      const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
      
      return {
        success: true,
        url: signedUrl,
      };
    } catch (error) {
      console.error('R2 서명된 URL 생성 오류:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      };
    }
  }
}

// 편의 함수들
export const uploadToR2 = CloudflareR2Storage.uploadFile;
export const downloadFromR2 = CloudflareR2Storage.downloadFile;
export const deleteFromR2 = CloudflareR2Storage.deleteFile;
export const listR2Files = CloudflareR2Storage.listFiles;
export const getR2SignedUrl = CloudflareR2Storage.getSignedUrl;
