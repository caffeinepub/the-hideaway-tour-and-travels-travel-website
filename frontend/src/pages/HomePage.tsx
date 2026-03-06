import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from '@tanstack/react-router';
import { MapPin, Clock, Users, Award } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: 'Exotic Destinations',
      description: 'Explore breathtaking locations across the globe with our curated travel experiences.',
    },
    {
      icon: Clock,
      title: 'Flexible Durations',
      description: 'Choose from weekend getaways to extended adventures that fit your schedule.',
    },
    {
      icon: Users,
      title: 'Group & Solo Travel',
      description: 'Whether traveling alone or with loved ones, we have the perfect tour for you.',
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Our experienced team ensures every journey is safe, memorable, and hassle-free.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-beach.dim_1200x600.jpg"
            alt="Beautiful beach destination"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Discover Your Next Adventure
          </h1>
          <p className="mb-8 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Escape the ordinary and explore extraordinary destinations with The HideAway Tour And Travels
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: '/tours' })}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            >
              Explore Tours
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: '/contact' })}
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At The HideAway Tour And Travels, we believe that travel is more than just visiting new places—it's
              about creating unforgettable memories, discovering diverse cultures, and connecting with the world
              around us. Our mission is to provide exceptional travel experiences that inspire, educate, and
              transform our guests.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight">Why Choose Us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Preview */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight">Featured Destinations</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { img: '/assets/generated/mountain-adventure.dim_800x600.jpg', title: 'Mountain Adventures' },
              { img: '/assets/generated/cultural-heritage.dim_800x600.jpg', title: 'Cultural Heritage' },
              { img: '/assets/generated/wildlife-safari.dim_800x600.jpg', title: 'Wildlife Safari' },
            ].map((dest, index) => (
              <div
                key={index}
                className="group relative h-80 overflow-hidden rounded-lg cursor-pointer"
                onClick={() => navigate({ to: '/gallery' })}
              >
                <img
                  src={dest.img}
                  alt={dest.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{dest.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" onClick={() => navigate({ to: '/gallery' })}>
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight">Ready to Start Your Journey?</h2>
          <p className="mb-8 text-xl max-w-2xl mx-auto opacity-90">
            Browse our carefully curated tours and find the perfect adventure for you
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate({ to: '/tours' })}
            className="text-lg px-8 py-6"
          >
            Browse All Tours
          </Button>
        </div>
      </section>
    </div>
  );
}
