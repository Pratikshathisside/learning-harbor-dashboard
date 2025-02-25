
import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

const TeacherDashboard = () => {
  const students = [
    { id: 1, name: 'John Doe', assignment: 'Essay 1', aiScore: 80, teacherScore: 85 },
    { id: 2, name: 'Jane Smith', assignment: 'Essay 1', aiScore: 92, teacherScore: 92 },
    { id: 3, name: 'Alice Johnson', assignment: 'Essay 1', aiScore: 75, teacherScore: null },
  ];

  return (
    <div className="space-y-8 fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Teacher Dashboard</h1>
        <p className="text-muted-foreground mt-2">Review and grade student assignments</p>
      </header>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Assignment Reviews</h2>
          <p className="text-muted-foreground">Review AI-graded assignments and provide feedback</p>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>AI Score</TableHead>
                <TableHead>Teacher Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.assignment}</TableCell>
                  <TableCell>{student.aiScore}%</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      defaultValue={student.teacherScore}
                      className="w-20"
                      placeholder="Score"
                    />
                  </TableCell>
                  <TableCell>
                    {student.teacherScore ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Class Performance</h3>
          <div className="h-64 flex items-center justify-center bg-secondary rounded-lg">
            <p className="text-muted-foreground">Performance chart will be displayed here</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent AI Feedback</h3>
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="mb-2 font-medium">Common Areas for Improvement</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Thesis statement clarity</li>
                <li>• Supporting evidence usage</li>
                <li>• Conclusion structure</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
