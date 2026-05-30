'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Package, Users, Award, Truck, Heart, Sparkles } from 'lucide-react'

const values = [
  {
    icon: Sparkles,
    title: 'Quality Design',
    description: 'Every piece in our collection is carefully curated for exceptional design and craftsmanship.'
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'We prioritize your experience with personalized service and support at every step.'
  },
  {
    icon: Award,
    title: 'Premium Materials',
    description: 'We source only the finest materials to ensure lasting quality and sustainability.'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Reliable shipping with real-time tracking so you always know where your order is.'
  }
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    description: 'With 15 years in interior design, Sarah founded 3D Store to revolutionize furniture shopping.'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Design',
    description: 'Michael leads our product curation team, bringing a keen eye for modern aesthetics.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Customer Experience',
    description: 'Emily ensures every customer interaction exceeds expectations with warmth and efficiency.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Package className="w-4 h-4" />
              About 3D Store
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Reimagining How You Shop for Your Home
            </h1>
            <p className="text-lg text-foreground leading-relaxed">
              We believe everyone deserves a beautiful living space. That&apos;s why we created 3D Store 
              — a revolutionary way to explore and visualize furniture before you buy. Experience 
              products in immersive 3D and find pieces that truly fit your style.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-card border-y border-border py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2020, 3D Store began with a simple idea: shopping for furniture 
                    online shouldn&apos;t be a guessing game. Traditional product photos never quite 
                    capture the true essence of a piece — its proportions, textures, and how it 
                    might look in your space.
                  </p>
                  <p>
                    We partnered with talented designers and cutting-edge 3D technology experts 
                    to create an immersive shopping experience. Today, every product in our 
                    collection features interactive 3D models that you can rotate, zoom, and 
                    examine from every angle.
                  </p>
                  <p>
                    Our mission is simple: help you create the home you&apos;ve always dreamed of, 
                    one beautiful piece at a time.
                  </p>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-2xl font-bold text-foreground">10,000+</p>
                  <p className="text-foreground">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from product selection to customer service.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-card border-y border-border py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind 3D Store who work every day to bring you the best experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-background border border-border rounded-xl p-6 text-center"
                >
                  <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-card" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-foreground">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Explore our collection of beautifully designed furniture, lighting, and decor 
              pieces with immersive 3D previews.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors"
            >
              <Package className="w-5 h-5" />
              Browse Products
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
