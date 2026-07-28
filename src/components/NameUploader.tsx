import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Recipient } from '@/types/certificate';

interface NameUploaderProps {
  onNamesLoaded: (recipients: Recipient[], filename: string) => void;
  currentFilename?: string;
  onClearFile: () => void;
  count: number;
}

export const NameUploader: React.FC<NameUploaderProps> = ({
  onNamesLoaded,
  currentFilename,
  onClearFile,
  count,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    const fileExt = file.name.split('.').pop()?.toLowerCase();

    if (fileExt !== 'csv' && fileExt !== 'txt') {
      setErrorMsg('Please upload a valid .csv or .txt file.');
      return;
    }

    if (fileExt === 'csv') {
      Papa.parse(file, {
        complete: (results) => {
          const rows = results.data as string[][];
          const extractedNames: Recipient[] = [];

          rows.forEach((row, idx) => {
            if (row && row.length > 0) {
              const nameCandidate = row[0]?.trim();
              // Ignore header row if it literally says "name" or "recipient"
              if (
                nameCandidate &&
                !(idx === 0 && (nameCandidate.toLowerCase() === 'name' || nameCandidate.toLowerCase() === 'recipient name'))
              ) {
                extractedNames.push({
                  id: `csv-${idx}-${Date.now()}`,
                  name: nameCandidate,
                  metadata: row.slice(1).join(', '),
                });
              }
            }
          });

          if (extractedNames.length === 0) {
            setErrorMsg('No recipient names found in the CSV file.');
          } else {
            onNamesLoaded(extractedNames, file.name);
          }
        },
        error: (err) => {
          setErrorMsg(`Error parsing CSV: ${err.message}`);
        },
      });
    } else {
      // Text file parsing (one name per line)
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          const lines = text
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter((l) => l.length > 0);

          const extractedNames: Recipient[] = lines.map((name, idx) => ({
            id: `txt-${idx}-${Date.now()}`,
            name,
          }));

          if (extractedNames.length === 0) {
            setErrorMsg('No text content found in file.');
          } else {
            onNamesLoaded(extractedNames, file.name);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv,.txt"
        className="hidden"
      />

      {currentFilename ? (
        <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl transition-all">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-emerald-300 truncate">{currentFilename}</p>
              <p className="text-xs text-emerald-400/80">{count} recipient(s) loaded</p>
            </div>
          </div>
          <button
            onClick={onClearFile}
            className="p-1.5 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
              : 'border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-800/50'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">
                <span className="text-indigo-400 font-semibold hover:underline">Click to browse</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">Supports CSV or TXT file format</p>
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <p className="text-[11px] text-slate-400 flex items-center gap-1.5 px-1">
        <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        First column of CSV will be used as recipient name.
      </p>
    </div>
  );
};
