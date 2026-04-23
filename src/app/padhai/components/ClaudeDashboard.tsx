'use client';

import { BookOpen, Flame, Trophy, Clock, Target, CheckCircle, Brain, Zap, ArrowRight, Calendar, BarChart3 } from 'lucide-react';
import Link from 'next/link';

/**
 * Claude Design System for Padhai
 * - Clean, minimal aesthetic
 * - Subtle color palette
 * - Generous whitespace
 * - Focus on readability and clarity
 * - Smooth interactions
 */

export function ClaudeDashboard() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-gray-900">Padhai</h1>
              <p className="text-xs text-gray-500">Study Tracker</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Profile
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Start Session
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Studier! 👋</h2>
          <p className="text-base text-gray-600">Let's crush your study goals today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Flame, label: 'Current Streak', value: '12 days', color: 'text-orange-600' },
            { icon: Trophy, label: 'Best Streak', value: '45 days', color: 'text-yellow-600' },
            { icon: CheckCircle, label: 'Topics Done', value: '24 / 120', color: 'text-green-600' },
            { icon: Clock, label: 'Study Time', value: '42 hours', color: 'text-blue-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <p className="text-xs font-medium text-gray-600">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Study Plan */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">This Week's Plan</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>

              {/* Study sessions */}
              <div className="space-y-4">
                {[
                  { day: 'Monday', subject: 'Physics - Thermodynamics', duration: '2h', status: 'completed' },
                  { day: 'Tuesday', subject: 'Chemistry - Organic Reactions', duration: '1.5h', status: 'in-progress' },
                  { day: 'Wednesday', subject: 'Mathematics - Calculus', duration: '2.5h', status: 'pending' },
                  { day: 'Thursday', subject: 'Biology - Cell Division', duration: '2h', status: 'pending' },
                ].map((session, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      session.status === 'completed'
                        ? 'bg-green-50 border-green-200'
                        : session.status === 'in-progress'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-2 h-2 rounded-full ${
                        session.status === 'completed' ? 'bg-green-600' :
                        session.status === 'in-progress' ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{session.day}</p>
                        <p className="text-sm text-gray-600">{session.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{session.duration}</p>
                      <p className="text-xs text-gray-500 capitalize">{session.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            {[
              { icon: Brain, title: 'Start Quiz', desc: 'Test your knowledge', href: '/padhai/quiz' },
              { icon: Target, title: 'Set Goal', desc: 'Create weekly goals', href: '/padhai/goals' },
              { icon: BarChart3, title: 'View Progress', desc: 'Track improvements', href: '/padhai/track' },
              { icon: BookOpen, title: 'Browse Topics', desc: 'Explore chapters', href: '/padhai/syllabus' },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <action.icon className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{action.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{action.desc}</p>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors mt-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Keep the momentum! 🚀</h3>
          <p className="text-gray-600 mb-4">You're {Math.floor(Math.random() * 30 + 20)}% through your exam prep. Just {Math.floor(Math.random() * 30 + 50)} more topics to master!</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Continue Studying
          </button>
        </div>
      </main>
    </div>
  );
}
