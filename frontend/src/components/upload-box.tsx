'use client';

import { useState, type DragEvent, useRef } from 'react';
import { UploadCloud, Loader2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePrediction } from '@/contexts/PredictionContext';

type UploadBoxProps = {
  fileType: 'CSV' | 'Image';
};

export function UploadBox({ fileType }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const URL = "https://6f757f214505.ngrok-free.app";

  // Use the global prediction context - REMOVED local prediction state
  const { prediction, setPrediction } = usePrediction();

  // Define accepted file types
  const acceptedTypes = fileType === 'CSV' ? '.csv' : '.fits';

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.name.toLowerCase().endsWith(acceptedTypes.split(',').map(t => t.replace('.', '')).join('|'))) {
        toast({
          title: 'Invalid file type',
          description: `Only ${acceptedTypes} files are accepted.`,
          variant: 'destructive'
        });
        return;
      }
      handleFileUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(acceptedTypes.split(',').map(t => t.replace('.', '')).join('|'))) {
      toast({
        title: 'Invalid file type',
        description: `Only ${acceptedTypes} files are accepted.`,
        variant: 'destructive'
      });
      return;
    }

    handleFileUpload(file);
  };

  const handleFileUpload = async (file: File) => {
    if (fileType !== 'CSV') {
      toast({
        title: 'Feature Coming Soon',
        description: 'Image upload functionality will be available soon.',
      });
      return;
    }

    setIsUploading(true);
    setSelectedFile(file);
    setPrediction(null); // Use global setPrediction

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${URL}/predictions/exoplanet_or_not`, {
        method: 'POST',
        body: formData,
        headers: {
          'ngrok-skip-browser-warning': '*'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data); // Use global setPrediction

      toast({
        title: 'Analysis Complete!',
        description: `Found ${data.results.length} entries in your CSV file.`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload Failed',
        description: 'There was an error processing your file. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!prediction?.id) return;

    setIsDownloading(true);
    try {
      const response = await fetch(`${URL}/predictions/download?id=${prediction.id}`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': '*'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Create a blob from the response and download it
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = prediction.id;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: 'Download Complete',
        description: `File "${prediction.id}" has been downloaded.`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: 'Download Failed',
        description: 'There was an error downloading your file. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleButtonClick = () => inputRef.current?.click();

  const getPredictionStats = () => {
    if (!prediction?.results) return null;

    const stats = {
      confirmed: 0,
      falsePositive: 0,
      total: prediction.results.length
    };

    prediction.results.forEach((result, index) => {
      const value = result[index].label;
      const confidence = result[index].confidence;
      if (value === 'Confirmed Planet') {
        stats.confirmed++;
      } else if (value === 'False Positive') {
        stats.falsePositive++;
      }
    });
    return stats;
  };

  const stats = getPredictionStats();

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
          'border-muted-foreground/50 hover:border-accent hover:bg-accent/10',
          isDragging && 'border-accent bg-accent/10',
          isUploading && 'border-blue-500 bg-blue-50'
        )}
        onClick={!isUploading ? handleButtonClick : undefined}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Loader2 className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
            <p className="mb-2 text-sm text-muted-foreground">
              Analyzing your CSV file...
            </p>
            <p className="text-xs text-muted-foreground">This may take a few moments</p>
          </div>
        ) : prediction ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Download className="w-6 h-6" />
              <span className="font-semibold">Analysis Complete!</span>
            </div>
            {stats && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {stats.confirmed} confirmed planets, {stats.falsePositive} false positives
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Out of {stats.total} total entries
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className={cn('w-10 h-10 mb-3 transition-colors', isDragging ? 'text-accent' : 'text-muted-foreground')} />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">{fileType} files only</p>
          </div>
        )}
        <input
          ref={inputRef}
          id={`file-upload-${fileType}`}
          type="file"
          className="hidden"
          accept={acceptedTypes}
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>

      {prediction ? (
        <Button 
          onClick={handleDownload} 
          disabled={isDownloading}
          className="w-full"
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download Results ({prediction.id})
            </>
          )}
        </Button>
      ) : (
        <Button 
          onClick={handleButtonClick} 
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            `Upload ${fileType} Data`
          )}
        </Button>
      )}

      {selectedFile && !isUploading && !prediction && (
        <div className="text-sm text-muted-foreground text-center">
          Selected: {selectedFile.name}
        </div>
      )}
    </div>
  );
}