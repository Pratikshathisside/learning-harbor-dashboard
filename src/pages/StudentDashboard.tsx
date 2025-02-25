
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Info, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const assignments = [
    { 
      id: 1, 
      name: 'Mathematics Assignment 1',
      score: 85, 
      status: 'completed',
      subject: 'Mathematics', 
      deadline: '2024-03-01',
      feedback: 'Good understanding of calculus concepts',
      weakAreas: ['Integration techniques', 'Complex number applications']
    },
    { 
      id: 2, 
      name: 'Physics Lab Report',
      score: 72, 
      status: 'needs_review',
      subject: 'Physics', 
      deadline: '2024-03-05',
      feedback: 'Needs more detailed experimental analysis',
      weakAreas: ['Data interpretation', 'Error analysis']
    },
    { 
      id: 3, 
      name: 'Chemistry Assignment 3',
      status: 'pending',
      subject: 'Chemistry', 
      deadline: '2024-03-10'
    }
  ];

  const subjectProgress = [
    { 
      subject: 'Mathematics', 
      progress: 85, 
      semester: 1,
      weakAreas: ['Complex Integration', 'Differential Equations'],
      recommendedResources: [
        { title: 'Khan Academy - Calculus', url: '#' },
        { title: 'MIT OpenCourseWare - Advanced Math', url: '#' }
      ]
    },
    { 
      subject: 'Physics', 
      progress: 72, 
      semester: 1,
      weakAreas: ['Quantum Mechanics', 'Electromagnetism'],
      recommendedResources: [
        { title: 'Physics Lab Techniques', url: '#' },
        { title: 'Video: Understanding Wave Functions', url: '#' }
      ]
    },
    { 
      subject: 'Chemistry', 
      progress: 65, 
      semester: 1,
      weakAreas: ['Organic Reactions', 'Chemical Equilibrium'],
      recommendedResources: [
        { title: 'Chemistry Lab Safety Guide', url: '#' },
        { title: 'Interactive Periodic Table', url: '#' }
      ]
    }
  ];

  const performanceTrend = [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 89 }
  ];

  return (
    <div className="space-y-8 fade-in">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground mt-2">Track your progress and assignments</p>
          </div>
          <Button 
            size="lg"
            onClick={() => navigate('/upload')}
            className="gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            Upload Assignment
          </Button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="space-y-6">
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
              <div className="flex justify-between items-start mb-4">
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
                <div className="space-y-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Score</span>
                    <span>{assignment.score}%</span>
                  </div>
                  <Progress value={assignment.score} className="h-2" />
                  {assignment.feedback && (
                    <div className="bg-secondary p-3 rounded-lg text-sm">
                      <p className="font-medium mb-2">Feedback:</p>
                      <p className="text-muted-foreground">{assignment.feedback}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Subject Progress</h3>
            <div className="space-y-6">
              {subjectProgress.map((subject) => (
                <div key={subject.subject} className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{subject.subject}</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="font-medium text-sm mb-2">Areas to Improve:</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {subject.weakAreas.map((area) => (
                        <li key={area}>{area}</li>
                      ))}
                    </ul>
                    <div className="mt-3">
                      <p className="font-medium text-sm mb-2">Recommended Resources:</p>
                      <ul className="space-y-1">
                        {subject.recommendedResources.map((resource) => (
                          <li key={resource.title}>
                            <a href={resource.url} className="text-sm text-primary hover:underline">
                              {resource.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
