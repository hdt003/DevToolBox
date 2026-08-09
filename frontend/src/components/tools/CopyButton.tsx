import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button, ButtonProps } from '../common/Button';

interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  value: string;
  label?: string;
  copiedLabel?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label = 'Copy',
  copiedLabel = 'Copied!',
  variant = 'secondary',
  size = 'sm',
  className = '',
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy logic
      const textArea = document.createElement('textarea');
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant={copied ? 'primary' : variant}
      size={size}
      onClick={handleCopy}
      disabled={!value}
      className={className}
      {...props}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-300" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
};
