import React from "react";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

export function SummaryCards() {
  const summaries = [
    {
      id: "total-tasks",
      title: "Total Tasks",
      value: "256",
      icon: FileText,
      description: "Across all projects",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "in-progress",
      title: "In Progress",
      value: "42",
      icon: Clock,
      description: "Currently active",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "completed",
      title: "Completed",
      value: "189",
      icon: CheckCircle,
      description: "Successfully finished",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: "pending-review",
      title: "Pending Review",
      value: "25",
      icon: AlertCircle,
      description: "Awaiting approval",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Project Summary</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaries.map((summary) => {
          const Icon = summary.icon;
          return (
            <Card key={summary.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-600">{summary.title}</CardTitle>
                  <div className={`p-2 ${summary.bgColor} rounded-lg`}>
                    <Icon className={`w-5 h-5 ${summary.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-900 mb-2">{summary.value}</p>
                <p className="text-gray-500">{summary.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Project Completion</span>
              <span className="text-gray-900">73.8%</span>
            </div>
            <Progress value={73.8} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Team Productivity</span>
              <span className="text-gray-900">86.2%</span>
            </div>
            <Progress value={86.2} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Client Satisfaction</span>
              <span className="text-gray-900">92.5%</span>
            </div>
            <Progress value={92.5} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}