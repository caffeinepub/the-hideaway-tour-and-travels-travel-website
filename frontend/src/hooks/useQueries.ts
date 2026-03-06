import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Tour, GalleryImage, ContactInfo } from '@/backend';

export function useGetAllTours() {
  const { actor, isFetching } = useActor();

  return useQuery<Tour[]>({
    queryKey: ['tours'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTours();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllGalleryImages() {
  const { actor, isFetching } = useActor();

  return useQuery<GalleryImage[]>({
    queryKey: ['gallery'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInfo>({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookTour() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerName,
      contactInfo,
      tourId,
      travelDates,
      groupSize,
      specialRequests,
    }: {
      customerName: string;
      contactInfo: string;
      tourId: bigint;
      travelDates: string;
      groupSize: bigint;
      specialRequests: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.bookTour(customerName, contactInfo, tourId, travelDates, groupSize, specialRequests);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerName,
      contactInfo,
      message,
    }: {
      customerName: string;
      contactInfo: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitInquiry(customerName, contactInfo, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}
