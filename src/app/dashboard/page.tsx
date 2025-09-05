import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to Your Genealogy Dashboard</h1>
          <p className="text-slate-600">
            Discover your family history with AI-powered research tools and professional genealogy services.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">📋</span>
              </div>
              <CardTitle>Start New Project</CardTitle>
              <CardDescription>
                Begin a new genealogy research project for your family
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/projects/new">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Create Project
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">📄</span>
              </div>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload historical documents for AI analysis and processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/documents">
                <Button variant="outline" className="w-full">
                  Manage Documents
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                <span className="text-2xl">🤖</span>
              </div>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Get personalized research suggestions and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/ai-assistant">
                <Button variant="outline" className="w-full">
                  Get Suggestions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Projects</h2>
            <Link href="/dashboard/projects">
              <Button variant="ghost">View All Projects</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Smith Family Research</CardTitle>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">Active</span>
                </div>
                <CardDescription>
                  Researching the Smith family lineage in New England, 1850-1950
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Family Members</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Documents</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Updated</span>
                    <span className="font-medium">2 days ago</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/projects/smith-family">
                    <Button size="sm" className="w-full">View Project</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Johnson Family Tree</CardTitle>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Research Phase</span>
                </div>
                <CardDescription>
                  Tracing Johnson ancestors back to Ireland, focusing on immigration records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Family Members</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Documents</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Updated</span>
                    <span className="font-medium">1 week ago</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/projects/johnson-family">
                    <Button size="sm" className="w-full" variant="outline">View Project</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">✨</span>
              <span>Recent AI Insights</span>
            </CardTitle>
            <CardDescription>
              AI-powered discoveries and research suggestions from your projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Potential Relationship Detected</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      AI analysis suggests Mary Smith (1880) and John Smith (1878) may be siblings based on shared locations and time periods.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">Confidence: 85%</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Research Suggestion</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Consider searching Census records for the Johnson family in County Cork, Ireland between 1860-1880 for immigration documentation.
                    </p>
                    <p className="text-xs text-emerald-600 mt-2">Priority: High</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/dashboard/ai-assistant">
                  <Button variant="ghost" size="sm">View All AI Insights</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}