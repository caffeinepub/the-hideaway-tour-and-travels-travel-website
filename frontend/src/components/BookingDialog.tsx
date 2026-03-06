import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useBookTour } from '@/hooks/useQueries';
import { toast } from 'sonner';
import type { Tour } from '@/backend';

interface BookingDialogProps {
  tour: Tour;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookingDialog({ tour, open, onOpenChange }: BookingDialogProps) {
  const bookTour = useBookTour();

  const [formData, setFormData] = useState({
    customerName: '',
    contactInfo: '',
    travelDates: '',
    groupSize: '',
    specialRequests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.contactInfo || !formData.travelDates || !formData.groupSize) {
      toast.error('Please fill in all required fields');
      return;
    }

    const groupSizeNum = parseInt(formData.groupSize);
    if (isNaN(groupSizeNum) || groupSizeNum < 1) {
      toast.error('Please enter a valid group size');
      return;
    }

    try {
      await bookTour.mutateAsync({
        customerName: formData.customerName,
        contactInfo: formData.contactInfo,
        tourId: tour.id,
        travelDates: formData.travelDates,
        groupSize: BigInt(groupSizeNum),
        specialRequests: formData.specialRequests,
      });

      toast.success('Booking request submitted successfully! We will contact you soon to confirm.');
      setFormData({
        customerName: '',
        contactInfo: '',
        travelDates: '',
        groupSize: '',
        specialRequests: '',
      });
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Tour</DialogTitle>
          <DialogDescription>
            Complete the form below to book <strong>{tour.destination}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              placeholder="Your full name"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo">Email or Phone *</Label>
            <Input
              id="contactInfo"
              placeholder="Your email or phone number"
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelDates">Preferred Travel Dates *</Label>
            <Input
              id="travelDates"
              placeholder="e.g., March 15-20, 2025"
              value={formData.travelDates}
              onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupSize">Group Size *</Label>
            <Input
              id="groupSize"
              type="number"
              min="1"
              placeholder="Number of travelers"
              value={formData.groupSize}
              onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              placeholder="Any special requirements or questions..."
              rows={4}
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={bookTour.isPending}>
              {bookTour.isPending ? 'Submitting...' : 'Submit Booking'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
