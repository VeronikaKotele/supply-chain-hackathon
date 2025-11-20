import { MoreVertical, ArrowUpDown } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const entries = [
  {
    id: "PRJ-001",
    name: "Website Redesign",
    status: "In Progress",
    priority: "High",
    assignee: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      initials: "SJ",
    },
    dueDate: "2025-11-25",
    progress: 65,
  },
  {
    id: "PRJ-002",
    name: "Mobile App Development",
    status: "In Progress",
    priority: "High",
    assignee: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      initials: "MC",
    },
    dueDate: "2025-12-10",
    progress: 42,
  },
  {
    id: "PRJ-003",
    name: "Marketing Campaign",
    status: "Completed",
    priority: "Medium",
    assignee: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      initials: "ED",
    },
    dueDate: "2025-11-18",
    progress: 100,
  },
  {
    id: "PRJ-004",
    name: "Database Migration",
    status: "Pending",
    priority: "High",
    assignee: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      initials: "DW",
    },
    dueDate: "2025-11-30",
    progress: 0,
  },
  {
    id: "PRJ-005",
    name: "API Integration",
    status: "In Progress",
    priority: "Medium",
    assignee: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      initials: "LA",
    },
    dueDate: "2025-11-28",
    progress: 78,
  },
  {
    id: "PRJ-006",
    name: "Security Audit",
    status: "In Progress",
    priority: "Critical",
    assignee: {
      name: "James Brown",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      initials: "JB",
    },
    dueDate: "2025-11-22",
    progress: 55,
  },
  {
    id: "PRJ-007",
    name: "User Documentation",
    status: "Completed",
    priority: "Low",
    assignee: {
      name: "Anna Taylor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      initials: "AT",
    },
    dueDate: "2025-11-15",
    progress: 100,
  },
  {
    id: "PRJ-008",
    name: "Performance Optimization",
    status: "Pending",
    priority: "Medium",
    assignee: {
      name: "Robert Martinez",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      initials: "RM",
    },
    dueDate: "2025-12-05",
    progress: 0,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700 hover:bg-green-100";
    case "In Progress":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    case "Pending":
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-700 hover:bg-red-100";
    case "High":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    case "Low":
      return "bg-green-100 text-green-700 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
};

export function EntriesTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Projects</CardTitle>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div>
                      <div className="text-gray-900">{entry.name}</div>
                      <div className="text-gray-500">{entry.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={entry.assignee.avatar} />
                        <AvatarFallback>{entry.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-gray-700">{entry.assignee.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(entry.priority)}>
                      {entry.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{entry.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${entry.progress}%` }}
                        />
                      </div>
                      <span className="text-gray-700">{entry.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Assign Team</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
