import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetAllTours } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { useState } from 'react';
import BookingDialog from '@/components/BookingDialog';
import type { Tour } from '@/backend';

export default function ToursPage() {
  const { data: tours, isLoading } = useGetAllTours();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setBookingDialogOpen(true);
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">Our Tours</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of tours designed to create unforgettable memories
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : tours && tours.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <Card key={Number(tour.id)} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{tour.destination}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-base mb-4">{tour.description}</CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {Number(tour.duration)} {Number(tour.duration) === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-bold text-primary">${Number(tour.price)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleBookNow(tour)}>
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No tours available at the moment. Check back soon!</p>
          </div>
        )}
      </div>

      {selectedTour && (
        <BookingDialog
          tour={selectedTour}
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
        />
      )}
    </div>
  );
}
