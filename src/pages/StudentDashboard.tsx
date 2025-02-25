
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Info } from "lucide-react";

const StudentDashboard = () => {
  const assignments = [
    { id: 1, name: 'Assignment 1', score: 85, status: 'completed', subject: 'Mathematics', deadline: '2024-03-01' },
    { id: 2, name: 'Assignment 2', score: 72, status: 'needs_review', subject: 'Physics', deadline: '2024-03-05' },
    { id: 3, name: 'Assignment 3', status: 'pending', subject: 'Chemistry', deadline: '2024-03-10' },
  ];

  const subjectProgress = [
    { subject: 'Mathematics', progress: 85, semester: 1 },
    { subject: 'Physics', progress: 72, semester: 1 },
    { subject: 'Chemistry', progress: 65, semester: 1 },
  ];

  const assignmentHistory = [
    { id: 1, name: 'Previous Assignment 1', date: '2024-02-01', score: 90 },
    { id: 2, name: 'Previous Assignment 2', date: '2024-02-15', score: 85 },
  ];

  return (
    <div className="space-y-8 fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track your progress and assignments</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Assignments</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click on any assignment to view details and answer key</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {assignments.map((assignment) => (
            <Card key={assignment.id} className="p-6 card-hover">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{assignment.name}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  assignment.status === 'needs_review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {assignment.status === 'completed' ? 'Completed' :
                   assignment.status === 'needs_review' ? 'Needs Review' :
                   'Pending'}
                </span>
              </div>
              {assignment.score && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Score</span>
                    <span>{assignment.score}%</span>
                  </div>
                  <Progress value={assignment.score} className="h-2" />
                </div>
              )}
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Progress Overview</h2>
          
          <Card className="p-6">
            <h3 className="font-medium mb-4">Semester 1 Progress</h3>
            <div className="space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{subject.subject}</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-4">Assignment History</h3>
            <div className="space-y-4">
              {assignmentHistory.map((history) => (
                <div key={history.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">{history.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(history.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-primary font-medium">{history.score}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-4">AI Feedback</h3>
            <p className="text-muted-foreground mb-4">
              "Your essays show strong analytical skills. Focus on improving thesis clarity
              and supporting your arguments with more specific examples."
            </p>
            <div className="bg-secondary p-4 rounded-lg">
              <h4 className="font-medium mb-2">Suggested Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Academic Writing: Structure and Style
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline">
                    Research Methods Workshop
                  </a>
                </li>
              </ul>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
