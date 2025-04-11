import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Calendar, BarChart2, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Mock Interview', href: '/mock-interview', icon: MessageSquare },
    { name: 'Daily Tasks', href: '/daily-tasks', icon: Calendar },
    { name: 'Feedback', href: '/feedback', icon: BarChart2 },
    { name: 'My Journey', href: '/journey', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/" className="flex ml-2 md:mr-24">
                <MessageSquare className="h-8 w-8 text-indigo-600" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ml-2">
                  Soft Skills Trainer
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        <aside className="fixed left-0 z-40 w-64 h-screen transition-transform">
          <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
            <ul className="space-y-2 font-medium">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${
                        location.pathname === item.href
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5 transition duration-75" />
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64">
          <div className="p-4 rounded-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}