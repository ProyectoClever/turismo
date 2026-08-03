export type Destination = {
  id: string;
  name: string;
  country: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type Tour = {
  id: string;
  destination_id: string | null;
  title: string;
  description: string | null;
  price: number;
  duration_days: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  destinations?: Pick<Destination, "name" | "country"> | null;
};

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string;
  tour_id: string;
  booking_date: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled";
  total_price: number;
  created_at: string;
  tours?: Pick<Tour, "title" | "price" | "duration_days" | "image_url"> | null;
};
