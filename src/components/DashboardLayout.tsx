'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { href: '/dashboard', label: 'Overview', description: 'Dashboard overview' },
  { href: '/dashboard/projects', label: 'Projects', description: 'Manage research projects' },
  { href: '/dashboard/family-tree', label: 'Family Tree', description: 'View family connections' },
  { href: '/dashboard/documents', label: 'Documents', description: 'Upload and manage files' },
  { href: '/dashboard/ai-assistant', label: 'AI Assistant', description: 'Get research suggestions' },
]

const adminNavigationItems = [
  { href: '/admin', label: 'Admin Overview', description: 'Admin dashboard' },
  { href: '/admin/clients', label: 'Clients', description: 'Manage clients' },
  { href: '/admin/projects', label: 'All Projects', description: 'View all projects' },
  { href: '/admin/analytics', label: 'Analytics', description: 'Business metrics' },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // In a real app, you'd get user data from a context or API
    // For now, we'll simulate this
    const getUserData = () => {
      // This would normally come from your auth context or API call
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: pathname.startsWith('/admin') ? 'ADMIN' : 'CLIENT'
      }
      setUser(mockUser)
      setLoading(false)
    }

    getUserData()
  }, [pathname])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const navItems = user?.role === 'ADMIN' ? adminNavigationItems : navigationItems

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-sm">FT</span>
          </div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href={user?.role === 'ADMIN' ? '/admin' : '/dashboard'} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FT</span>
                </div>
                <h1 className="text-xl font-bold text-slate-900">FamilyTree Pro</h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-slate-500">{user?.email}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.description}</div>
                  </Link>
                )
              })}
            </nav>

            {/* Quick Stats Card */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Active Projects</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Documents</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Family Members</span>
                  <span className="font-medium">48</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}