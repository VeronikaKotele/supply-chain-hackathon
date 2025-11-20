import React from "react";
import { TrendingUp, Users, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 5100 },
  { month: "Mar", value: 4800 },
  { month: "Apr", value: 6200 },
  { month: "May", value: 7100 },
  { month: "Jun", value: 6800 },
  { month: "Jul", value: 8200 },
];

const activityData = [
  { day: "Mon", hours: 6.5 },
  { day: "Tue", hours: 8.2 },
  { day: "Wed", hours: 7.8 },
  { day: "Thu", hours: 9.1 },
  { day: "Fri", hours: 7.5 },
  { day: "Sat", hours: 4.2 },
  { day: "Sun", hours: 3.8 },
];

export function HeroPanel() {
  const achievements = [
    {
      icon: TrendingUp,
      label: "Revenue",
      value: "$45,231",
      change: "+20.1%",
      positive: true,
    },
    {
      icon: Users,
      label: "Active Users",
      value: "2,845",
      change: "+12.5%",
      positive: true,
    },
    {
      icon: Target,
      label: "Conversion",
      value: "3.24%",
      change: "-2.4%",
      positive: false,
    },
    {
      icon: Award,
      label: "Projects",
      value: "128",
      change: "+8.2%",
      positive: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Achievement Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span
                    className={`text-sm ${
                      achievement.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {achievement.change}
                  </span>
                </div>
                <p className="text-gray-600 mb-1">{achievement.label}</p>
                <p className="text-gray-900">{achievement.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="hours" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}