
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  const assignments = [
    { id: 1, name: 'Assignment 1', score: 85, status: 'completed' },
    { id: 2, name: 'Assignment 2', score: 72, status: 'needs_review' },
    { id: 3, name: 'Assignment 3', status: 'pending' },
  ];

  return (
    <div className="space-y-8 fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track your progress and assignments</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Your Assignments</h2>
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="p-6 card-hover">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{assignment.name}</h3>
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
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">AI Feedback</h2>
          <Card className="p-6">
            <h3 className="font-medium mb-4">Latest Feedback</h3>
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
