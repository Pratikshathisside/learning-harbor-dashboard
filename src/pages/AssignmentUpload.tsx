
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const AssignmentUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  return (
    <div className="space-y-8 fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Assignment Upload</h1>
        <p className="text-muted-foreground mt-2">Upload assignments for AI analysis</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {file ? file.name : 'Drop your file here'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF, DOC up to 10MB'}
            </p>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              accept=".pdf,.doc,.docx"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="mx-auto">
                Browse Files
              </Button>
            </label>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          {file ? (
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-medium mb-2">File Information</h3>
                <p className="text-sm text-muted-foreground">
                  Name: {file.name}<br />
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB<br />
                  Type: {file.type}
                </p>
              </div>
              <Button className="w-full">
                Start AI Analysis
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-secondary rounded-lg">
              <p className="text-muted-foreground">No file selected</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AssignmentUpload;
