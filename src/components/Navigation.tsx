
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { BookOpen, Users } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Student Dashboard', path: '/student', icon: BookOpen },
    { name: 'Teacher Dashboard', path: '/teacher', icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 glass">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-8">Learning Harbor</h2>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )}
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
