import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">
            Manage your genealogy business, clients, and projects from this central hub.
          </p>
        </div>

        {/* Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Clients</CardDescription>
              <CardTitle className="text-3xl">248</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Projects</CardDescription>
              <CardTitle className="text-3xl">73</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Documents Analyzed</CardDescription>
              <CardTitle className="text-3xl">1,429</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600">+24% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>AI Insights Generated</CardDescription>
              <CardTitle className="text-3xl">956</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-600">+35% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">👥</span>
              </div>
              <CardTitle>Manage Clients</CardTitle>
              <CardDescription>
                View and manage all client accounts and their projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/clients">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  View Clients
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle>Business Analytics</CardTitle>
              <CardDescription>
                View detailed analytics and business performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/analytics">
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">📋</span>
              </div>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>
                Monitor all active projects across your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/projects">
                <Button variant="outline" className="w-full">
                  View Projects
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
            <Button variant="ghost">View All Activity</Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-medium text-sm">JD</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">New client registration</p>
                    <p className="text-sm text-slate-600">Jane Doe signed up and created her first project</p>
                    <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">AI</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">AI analysis completed</p>
                    <p className="text-sm text-slate-600">Document analysis finished for Smith Family Research project</p>
                    <p className="text-xs text-slate-500 mt-1">4 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-medium text-sm">MB</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Project update</p>
                    <p className="text-sm text-slate-600">Michael Brown added 5 new family members to his tree</p>
                    <p className="text-xs text-slate-500 mt-1">6 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-medium text-sm">📄</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">Document uploaded</p>
                    <p className="text-sm text-slate-600">Historical birth certificate uploaded to Johnson Family Tree project</p>
                    <p className="text-xs text-slate-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Processing Status</CardTitle>
              <CardDescription>Current AI service performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Document Analysis</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Relationship Detection</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Research Assistant</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage & Performance</CardTitle>
              <CardDescription>System resource utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Document Storage</span>
                  <span className="text-sm font-medium">2.4TB / 5TB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Database Size</span>
                  <span className="text-sm font-medium">1.8GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">AI API Calls Today</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}