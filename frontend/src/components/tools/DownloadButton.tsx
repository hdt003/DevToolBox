import React from 'react';
import { Download } from 'lucide-react';
import { Button, ButtonProps } from '../common/Button';

interface DownloadButtonProps extends Omit<ButtonProps, 'onClick'> {
  content: string;
  filename: string;
  mimeType?: string;
  label?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  filename,
  mimeType = 'text/plain;charset=utf-8',
  label = 'Download',
  variant = 'outline',
  size = 'sm',
  className = '',
  ...props
}) => {
  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={!content}
      className={className}
      {...props}
    >
      <Download className="h-3.5 w-3.5" />
      <span>{label}</span>
    </Button>
  );
};
