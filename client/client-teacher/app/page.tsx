"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Clock,
  Shield,
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  // const [selectedPlan, setSelectedPlan] = useState("professional");
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b bg-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-green-700" />
            <span className=" text-green-700 text-2xl font-bold">
              {/* TrainHub */}
              {/* eManage */}
              dManage
            </span>
          </div>
          <div className="hidden md:flex text-black items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
              Pricing
            </a>
            <Link href="/auth/login">
              <Button variant="signupButton">Sign In</Button>
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-3">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            🚀 Manage everything in seconds
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-700">
            {/* Complete Training */}
            Save Time & Money 
            <br />
            {/* Management System */}
            By Managing Everything
          </h1>
          <p className="text-xl  mb-8 max-w-2xl mx-auto">
            Empower your institute,colleges,schools,universities with an all-in-one platform to manage students, teachers, and
            courses. Get started in just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg cursor-pointer px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="watchDemo" className="text-lg text-black px-8">
              Watch Demo
            </Button>
            <Button size="lg" variant="watchDemo" className="text-lg text-black px-8">
              Create custom website
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { label: "Active Institutes", value: "500+" },
              { label: "Students Managed", value: "50K+" },
              { label: "Course Completions", value: "100K+" },
              { label: "Success Rate", value: "99.9%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-slate-700 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-2xl">Features</Badge>
            <h2 className="text-4xl font-bold text-slate-700 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your training institute operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Student Management",
                description:
                  "Track student progress, attendance, and performance with comprehensive dashboards.",
                color: "text-blue-600",
              },
              {
                icon: GraduationCap,
                title: "Teacher Portal",
                description:
                  "Dedicated portal for teachers to manage courses, assignments, and student interactions.",
                color: "text-green-600",
              },
              {
                icon: BookOpen,
                title: "Course Builder",
                description:
                  "Create and organize courses with modules, lessons, and multimedia content effortlessly.",
                color: "text-green-600",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description:
                  "Gain insights with detailed reports on enrollment, performance, and revenue metrics.",
                color: "text-orange-600",
              },
              {
                icon: Clock,
                title: "Automated Scheduling",
                description:
                  "Smart scheduling system for classes, exams, and events with conflict detection.",
                color: "text-pink-600",
              },
              {
                icon: Shield,
                title: "Secure & Scalable",
                description:
                  "Enterprise-grade security with role-based access control and data encryption.",
                color: "text-red-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-2xl">Simple Process</Badge>
            <h2 className="text-4xl font-bold mb-4 text-slate-700">Get Started in 3 Easy Steps</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Launch your complete training management system in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your institute account and choose your plan. No credit card required for trial.",
              },
              {
                step: "02",
                title: "Customize",
                description: "Set up your branding, add courses, and invite your first teachers and students.",
              },
              {
                step: "03",
                title: "Launch",
                description: "Go live instantly! Your complete training management system is ready to use.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-700   mb-6 text-white flex items-center justify-center  text-3xl font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-700">{item.title}</h3>
                <p className=" text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {/* <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 text-2xl">Why Choose Us</Badge>
              <h2 className="text-4xl font-bold mb-6">Built for Modern Training Institutes</h2>
              <p className="text-lg  mb-8">
                Our platform is designed with the latest technology to ensure your institute stays
                ahead of the competition.
              </p>
              <div className="space-y-4">
                {[
                  "Multi-tenant architecture for unlimited institutes",
                  "Real-time notifications and updates",
                  "Mobile-responsive design for all devices",
                  "24/7 customer support",
                  "Regular updates and new features",
                  "99.9% uptime guarantee",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Zap, label: "Lightning Fast", value: "< 100ms" },
                { icon: Globe, label: "Global CDN", value: "150+ Regions" },
                { icon: Shield, label: "Data Security", value: "256-bit SSL" },
                { icon: Smartphone, label: "Mobile Ready", value: "iOS & Android" },
              ].map((item, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <div className="text-2xl font-bold mb-2">{item.value}</div>
                  <div className="text-sm ">{item.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 ">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-2xl">Pricing</Badge>
            <h2 className="text-4xl font-bold mb-4 text-slate-700">Choose Your Perfect Plan</h2>
            <p className="text-xl  max-w-2xl mx-auto text-slate-600">
              Flexible pricing options for institutes of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                description: "Perfect for small institutes",
                features: [
                  "Up to 10 students",
                  "2 teachers",
                  "4 courses",
                  "Basic analytics",
                  "Email support",
                ],
                popular: false,
              },
              {
                name: "Professional",
                price: "$99",
                description: "Best for growing institutes",
                features: [
                  "Up to 500 students",
                  "50 teachers",
                  "Unlimited courses",
                  "Advanced analytics",
                  "Priority support",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Unlimited students",
                  "Unlimited teachers",
                  "Unlimited courses",
                  "Full analytics suite",
                  "24/7 phone support",
                  "Dedicated account manager",
                  "Custom integrations",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular
                  ? "border-primary shadow-xl scale-105"
                  : "hover:shadow-lg"
                  } transition-all duration-300`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="">/month</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 from-primary to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-700 ">
            Ready to Transform Your Training Institute?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-slate-700" >
            Join hundreds of institutes already using TrainHub to manage their operations
            efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-slate-700 cursor-pointer text-white hover:text-white hover:bg-slate-900">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" className="text-black cursor-pointer text-lg px-8 bg-transparent hover:text-white hover:bg-green-700">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-8 w-8" />
                <span className="text-2xl font-bold">TrainHub</span>
              </div>
              <p className="text-slate-400">
                Empowering training institutes with modern management solutions.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2026 TrainHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
