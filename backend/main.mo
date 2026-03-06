import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type Tour = {
    id : Nat;
    destination : Text;
    price : Nat;
    duration : Nat; // Duration in days
    description : Text;
  };

  module Tour {
    public func compare(tour1 : Tour, tour2 : Tour) : Order.Order {
      switch (Nat.compare(tour1.price, tour2.price)) {
        case (#equal) { Nat.compare(tour1.duration, tour2.duration) };
	      case (order) { order };
      };
    };

    public func compareByDestination(tour1 : Tour, tour2 : Tour) : Order.Order {
      Text.compare(tour1.destination, tour2.destination);
    };
  };

  type Booking = {
    id : Nat;
    customerName : Text;
    contactInfo : Text;
    tourId : Nat;
    travelDates : Text;
    groupSize : Nat;
    specialRequests : Text;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.id, booking2.id);
    };

    public func compareByGroupSize(booking1 : Booking, booking2 : Booking) : Order.Order {
      Nat.compare(booking1.groupSize, booking2.groupSize);
    };
  };

  type Inquiry = {
    id : Nat;
    customerName : Text;
    contactInfo : Text;
    message : Text;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Nat.compare(inquiry1.id, inquiry2.id);
    };

    public func compareByName(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Text.compare(inquiry1.customerName, inquiry2.customerName);
    };
  };

  type GalleryImage = {
    id : Nat;
    title : Text;
    description : Text;
    blob : Storage.ExternalBlob;
  };

  module GalleryImage {
    public func compare(image1 : GalleryImage, image2 : GalleryImage) : Order.Order {
      Text.compare(image1.title, image2.title);
    };

    public func compareById(image1 : GalleryImage, image2 : GalleryImage) : Order.Order {
      Nat.compare(image1.id, image2.id);
    };
  };

  type ContactInfo = {
    address : Text;
    phone : Text;
    email : Text;
    businessHours : Text;
  };

  var nextTourId = 1;
  var nextBookingId = 1;
  var nextInquiryId = 1;
  var nextImageId = 1;

  let tours = Map.empty<Nat, Tour>();
  let bookings = List.empty<Booking>();
  let inquiries = List.empty<Inquiry>();
  let gallery = List.empty<GalleryImage>();

  let contactInfo : ContactInfo = {
    address = "123 Travel St, Vacation City";
    phone = "+1 234 567 890";
    email = "info@thehideaway.com";
    businessHours = "Mon-Fri 9am-6pm";
  };

  public shared ({ caller }) func addTour(destination : Text, price : Nat, duration : Nat, description : Text) : async Nat {
    if (not caller.isController()) {
      Runtime.trap("Only admin can add tours");
    };
    let tour : Tour = {
      id = nextTourId;
      destination;
      price;
      duration;
      description;
    };
    tours.add(nextTourId, tour);
    nextTourId += 1;
    tour.id;
  };

  public query ({ caller }) func getTourById(id : Nat) : async Tour {
    switch (tours.get(id)) {
      case (null) { Runtime.trap("Tour not found") };
      case (?tour) { tour };
    };
  };

  public query ({ caller }) func getAllTours() : async [Tour] {
    tours.values().toArray().sort();
  };

  public query ({ caller }) func getToursByDestination() : async [Tour] {
    tours.values().toArray().sort(Tour.compareByDestination);
  };

  public shared ({ caller }) func bookTour(customerName : Text, contactInfo : Text, tourId : Nat, travelDates : Text, groupSize : Nat, specialRequests : Text) : async Nat {
    switch (tours.get(tourId)) {
      case (null) { Runtime.trap("Tour not found") };
      case (?_) {
        let booking : Booking = {
          id = nextBookingId;
          customerName;
          contactInfo;
          tourId;
          travelDates;
          groupSize;
          specialRequests;
        };
        bookings.add(booking);
        nextBookingId += 1;
        booking.id;
      };
    };
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.toArray().sort();
  };

  public query ({ caller }) func getBookingsByGroupSize() : async [Booking] {
    bookings.toArray().sort(Booking.compareByGroupSize);
  };

  public shared ({ caller }) func submitInquiry(customerName : Text, contactInfo : Text, message : Text) : async Nat {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      customerName;
      contactInfo;
      message;
    };
    inquiries.add(inquiry);
    nextInquiryId += 1;
    inquiry.id;
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray().sort();
  };

  public query ({ caller }) func getInquiriesByName() : async [Inquiry] {
    inquiries.toArray().sort(Inquiry.compareByName);
  };

  public shared ({ caller }) func addGalleryImage(title : Text, description : Text, blob : Storage.ExternalBlob) {
    if (not caller.isController()) {
      Runtime.trap("Only admin can add gallery images.");
    };

    let image : GalleryImage = {
      id = nextImageId;
      title;
      description;
      blob;
    };
    gallery.add(image);
    nextImageId += 1;
  };

  public query ({ caller }) func getAllGalleryImages() : async [GalleryImage] {
    gallery.toArray().sort();
  };

  public query ({ caller }) func getGalleryImagesById() : async [GalleryImage] {
    gallery.toArray().sort(GalleryImage.compareById);
  };

  public query ({ caller }) func getContactInfo() : async ContactInfo {
    contactInfo;
  };
};
