import React from "react";
import { Search, Plus, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

export function Navbar() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    // Navigation logic can be added here
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white">D</span>
              </div>
              <span className="text-gray-900">Dashboard</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#"
                onClick={handleNavClick}
                className="text-gray-900 hover:text-blue-600 transition-colors"
              >
                Overview
              </a>
              <a
                href="#"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Projects
              </a>
              <a
                href="#"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Analytics
              </a>
              <a
                href="#"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Reports
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search Field */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-64"
              />
            </div>

            {/* New Project Button */}
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}