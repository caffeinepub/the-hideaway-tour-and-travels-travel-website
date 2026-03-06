import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface GalleryImage {
    id: bigint;
    title: string;
    blob: ExternalBlob;
    description: string;
}
export interface Tour {
    id: bigint;
    destination: string;
    duration: bigint;
    description: string;
    price: bigint;
}
export interface Booking {
    id: bigint;
    customerName: string;
    contactInfo: string;
    specialRequests: string;
    travelDates: string;
    tourId: bigint;
    groupSize: bigint;
}
export interface Inquiry {
    id: bigint;
    customerName: string;
    contactInfo: string;
    message: string;
}
export interface ContactInfo {
    businessHours: string;
    email: string;
    address: string;
    phone: string;
}
export interface backendInterface {
    addGalleryImage(title: string, description: string, blob: ExternalBlob): Promise<void>;
    addTour(destination: string, price: bigint, duration: bigint, description: string): Promise<bigint>;
    bookTour(customerName: string, contactInfo: string, tourId: bigint, travelDates: string, groupSize: bigint, specialRequests: string): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllGalleryImages(): Promise<Array<GalleryImage>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllTours(): Promise<Array<Tour>>;
    getBookingsByGroupSize(): Promise<Array<Booking>>;
    getContactInfo(): Promise<ContactInfo>;
    getGalleryImagesById(): Promise<Array<GalleryImage>>;
    getInquiriesByName(): Promise<Array<Inquiry>>;
    getTourById(id: bigint): Promise<Tour>;
    getToursByDestination(): Promise<Array<Tour>>;
    submitInquiry(customerName: string, contactInfo: string, message: string): Promise<bigint>;
}
