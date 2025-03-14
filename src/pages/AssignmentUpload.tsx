import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Clock, CheckCircle, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from 'jspdf';

const AssignmentUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const assignmentHistory = [
    { 
      id: 1, 
      name: 'Mathematics Assignment 1',
      submittedDate: '2024-02-20',
      status: 'completed',
      score: 85,
      answerKey: 'View Answer Key',
      feedback: 'Good work on calculus problems'
    },
    { 
      id: 2, 
      name: 'Physics Lab Report',
      submittedDate: '2024-02-15',
      status: 'completed',
      score: 92,
      answerKey: 'View Answer Key',
      feedback: 'Excellent experimental analysis'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      name: 'Chemistry Assignment 2',
      deadline: '2024-03-10',
      subject: 'Chemistry',
      requirements: 'Include lab results and analysis'
    },
    {
      id: 2,
      name: 'Physics Assignment 3',
      deadline: '2024-03-15',
      subject: 'Physics',
      requirements: 'Show all calculations'
    }
  ];

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
    setExtractedText(null);
    setPdfUrl(null);
  };

  const handleStartProcessing = () => {
    if (!file) return;
    setIsProcessing(true);
    setPdfUrl(null);
    
    setTimeout(() => {
      const simulatedText = `Assignment OCR Results for: ${file.name}\n\n` +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. " +
        "Cras porttitor, felis eu dignissim pharetra, velit ante consequat turpis, at volutpat quam lacus a risus. " +
        "Mauris a libero eget nulla accumsan fringilla. Sed tempus justo ut nibh eleifend, vitae volutpat diam aliquet. " +
        "Integer ut nunc gravida, placerat eros ut, pulvinar nisl. \n\n" +
        "Equations detected:\n" +
        "E = mc²\n" +
        "F = ma\n" +
        "PV = nRT\n\n" +
        "Analysis:\n" +
        "The assignment demonstrates understanding of basic physics principles with appropriate application of formulas.";
      
      setExtractedText(simulatedText);
      generatePDF(simulatedText, file.name);
      setIsProcessing(false);
      toast.success("OCR processing completed!");
    }, 2000);
  };

  const generatePDF = (text: string, fileName: string) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("OCR Extracted Text", 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`File: ${fileName}`, 20, 30);
    doc.text(`Processed: ${new Date().toLocaleString()}`, 20, 40);
    
    doc.line(20, 45, 190, 45);
    
    const splitText = doc.splitTextToSize(text, 170);
    doc.text(splitText, 20, 55);
    
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };
  
  const downloadPDF = () => {
    if (pdfUrl && file) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `${file.name.split('.')[0]}-ocr-results.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="space-y-8 fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Assignment Upload</h1>
        <p className="text-muted-foreground mt-2">Upload assignments for AI analysis</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
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
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  setFile(selectedFile);
                  if (selectedFile) {
                    setExtractedText(null);
                    setPdfUrl(null);
                  }
                }}
                accept=".pdf,.doc,.docx"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="mx-auto">
                  Browse Files
                </Button>
              </label>
            </div>
            {file && (
              <div className="mt-4">
                <Button 
                  className="w-full" 
                  onClick={handleStartProcessing}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Start AI Analysis'}
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-4 bg-secondary rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{deadline.name}</p>
                      <p className="text-sm text-muted-foreground">{deadline.subject}</p>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{new Date(deadline.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Requirements: {deadline.requirements}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {extractedText && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Extracted Text</h2>
                {pdfUrl && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadPDF} 
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{extractedText}</p>
              </div>
              
              {pdfUrl && (
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Generated PDF Preview</h3>
                  <div className="border rounded-lg overflow-hidden" style={{ height: '400px' }}>
                    <iframe 
                      src={pdfUrl} 
                      className="w-full h-full"
                      title="OCR Extracted Text PDF" 
                    />
                  </div>
                </div>
              )}
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Submission History</h2>
            <div className="space-y-4">
              {assignmentHistory.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-secondary rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{assignment.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {assignment.score}%
                    </span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      {assignment.answerKey}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignmentUpload;
