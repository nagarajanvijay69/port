export interface Shop {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressPostalCode: string;
  addressCountry: string;
  phone: string;
  email: string;
  logoUrl: string;
  coverImageUrl: string;
  category: string;
  openingHours?: string[];
  status: 'Open' | 'Closed' | 'Pending Approval' | 'Disabled';
  isVerified: boolean;
  latitude?: number;
  longitude?: number;
  createdAt: any; 
  updatedAt: any;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  category: string;
  isAvailable: boolean;
  stockQuantity?: number;
  createdAt: any;
  updatedAt: any;
}

export interface Order {
    id: string;
    userId: string;
    shopId: string;
    orderItemIds: string[];
    deliveryAddressId: string;
    totalAmount: number;
    currency: string;
    status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
    deliveryFee: number;
    paymentMethod: string;
    paymentStatus: 'Paid' | 'Pending' | 'Refunded';
    notes?: string;
    createdAt: any;
    updatedAt: any;
    estimatedDeliveryTime?: any;
    deliveryAgentId?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtOrder: number;
  itemNameAtOrder: string;
  itemImageUrlAtOrder?: string;
  currency: string;
}

export interface UserAddress {
  id: string;
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

export interface ShopReview {
  id: string;
  userId: string;
  shopId: string;
  rating: number;
  comment: string;
  createdAt: any;
  updatedAt: any;
}
