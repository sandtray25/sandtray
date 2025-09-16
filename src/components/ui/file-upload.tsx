"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete?: (url: string, fileName: string) => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export function FileUpload({ 
  onUploadComplete, 
  acceptedTypes = "image/*,application/pdf,.txt,.doc,.docx",
  maxSizeMB = 10 
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    // 파일을 상태에 추가 (업로드 중)
    setFiles(prev => [...prev, {
      name: file.name,
      size: file.size,
      type: file.type,
      url: '',
      status: 'uploading'
    }]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/r2/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setFiles(prev => prev.map(f => 
          f.name === file.name && f.status === 'uploading'
            ? { ...f, url: result.url, status: 'success' }
            : f
        ));
        
        if (onUploadComplete) {
          onUploadComplete(result.url, result.fileName);
        }
      } else {
        throw new Error(result.error || '업로드 실패');
      }
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.name === file.name && f.status === 'uploading'
          ? { ...f, status: 'error', error: error instanceof Error ? error.message : '알 수 없는 오류' }
          : f
      ));
    }
  }, [onUploadComplete]);

  const handleFileSelect = useCallback((selectedFiles: FileList) => {
    Array.from(selectedFiles).forEach(file => {
      // 파일 크기 검증
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`파일 크기가 ${maxSizeMB}MB를 초과합니다: ${file.name}`);
        return;
      }

      uploadFile(file);
    });
  }, [maxSizeMB, uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Cloudflare R2 파일 업로드
        </CardTitle>
        <CardDescription>
          파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요. (최대 {maxSizeMB}MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 드롭존 */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
            }
          `}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">
            파일을 여기에 드롭하거나
          </p>
          <Button
            variant="outline"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = acceptedTypes;
              input.multiple = true;
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                if (target.files) {
                  handleFileSelect(target.files);
                }
              };
              input.click();
            }}
          >
            파일 선택
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            지원 형식: 이미지, PDF, 문서 파일
          </p>
        </div>

        {/* 업로드된 파일 목록 */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">업로드된 파일</h4>
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <File className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {file.status === 'uploading' && (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                  {file.status === 'success' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  
                  {file.status === 'success' && file.url && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      보기
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.name)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
