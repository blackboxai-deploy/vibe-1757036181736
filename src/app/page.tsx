import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FT</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">FamilyTree Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6">
            Discover Your Family History with
            <span className="text-emerald-600"> AI-Powered Research</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Professional genealogy services enhanced by artificial intelligence. 
            Upload documents, discover relationships, and uncover your family's story 
            with unprecedented accuracy and speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Start Your Research
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Sample Report
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative">
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7b825bec-dcb0-4a17-9837-415698ddddbc.png"
            alt="Professional genealogy research workspace with historical documents and family tree charts"
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Advanced AI-Powered Genealogy Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our cutting-edge AI technology transforms traditional genealogy research, 
            making discoveries faster and more accurate than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <CardTitle>AI Document Analysis</CardTitle>
              <CardDescription>
                Upload historical documents and let our AI extract names, dates, 
                places, and relationships with remarkable accuracy.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧬</span>
              </div>
              <CardTitle>Relationship Detection</CardTitle>
              <CardDescription>
                AI analyzes family connections and suggests relationships based on 
                names, dates, and historical patterns.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <CardTitle>Research Assistant</CardTitle>
              <CardDescription>
                Get AI-powered suggestions for research directions, resources, 
                and strategies tailored to your specific family history.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌳</span>
              </div>
              <CardTitle>Interactive Family Trees</CardTitle>
              <CardDescription>
                Visualize your family history with dynamic, interactive trees 
                that update as new discoveries are made.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>
                Track research progress, manage documents, and collaborate 
                with professional genealogists seamlessly.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle>Name Standardization</CardTitle>
              <CardDescription>
                AI standardizes historical name variations and spelling 
                differences to improve search accuracy.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            How FamilyTree Pro Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our streamlined process combines professional expertise with AI technology 
            to deliver comprehensive genealogy research results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Create Project</h3>
            <p className="text-slate-600">
              Start a new research project and provide initial family information
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Documents</h3>
            <p className="text-slate-600">
              Share historical documents, photos, and records for AI analysis
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis</h3>
            <p className="text-slate-600">
              Our AI processes documents and suggests relationships and research directions
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              4
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Discover History</h3>
            <p className="text-slate-600">
              Explore your interactive family tree and comprehensive research results
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Discover Your Family History?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of families who have uncovered their heritage with 
              our AI-powered genealogy platform.
            </p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-slate-50">
                Start Your Research Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FT</span>
                </div>
                <h3 className="text-xl font-bold">FamilyTree Pro</h3>
              </div>
              <p className="text-slate-400 max-w-md">
                Professional genealogy services powered by artificial intelligence. 
                Discover your family history with unprecedented accuracy and speed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>AI Document Analysis</li>
                <li>Family Tree Research</li>
                <li>Professional Consultation</li>
                <li>Archive Research</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 FamilyTree Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}