/**
 * Printify API Client
 * Docs: https://developers.printify.com/
 */

const PRINTIFY_API_URL = 'https://api.printify.com/v1';

// Get API token from environment
const getApiToken = () => {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) {
    throw new Error('PRINTIFY_API_TOKEN is not set');
  }
  return token;
};

// Base fetch function with authentication
async function printifyFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${PRINTIFY_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${getApiToken()}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Printify API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Types
export interface PrintifyShop {
  id: number;
  title: string;
  sales_channel: string;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  images: ProductImage[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  blueprint_id: number;
  user_id: number;
  shop_id: number;
  print_provider_id: number;
  print_areas: PrintArea[];
  sales_channel_properties: unknown[];
}

export interface ProductOption {
  name: string;
  type: string;
  values: { id: number; title: string }[];
}

export interface ProductVariant {
  id: number;
  sku: string;
  cost: number;
  price: number;
  title: string;
  grams: number;
  is_enabled: boolean;
  is_default: boolean;
  is_available: boolean;
  options: number[];
  quantity: number;
}

export interface ProductImage {
  src: string;
  variant_ids: number[];
  position: string;
  is_default: boolean;
}

export interface PrintArea {
  variant_ids: number[];
  placeholders: Placeholder[];
}

export interface Placeholder {
  position: string;
  images: PlaceholderImage[];
}

export interface PlaceholderImage {
  id: string;
  name: string;
  type: string;
  height: number;
  width: number;
  x: number;
  y: number;
  scale: number;
  angle: number;
}

export interface PrintifyOrder {
  id: string;
  address_to: Address;
  line_items: LineItem[];
  metadata: OrderMetadata;
  total_price: number;
  total_shipping: number;
  total_tax: number;
  status: string;
  shipping_method: number;
  shipments: Shipment[];
  created_at: string;
  sent_to_production_at: string;
  fulfilled_at: string;
}

export interface Address {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  region: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
}

export interface LineItem {
  product_id: string;
  quantity: number;
  variant_id: number;
  print_provider_id: number;
  blueprint_id: number;
  sku: string;
  cost: number;
  shipping_cost: number;
  status: string;
  metadata: {
    title: string;
    price: number;
    variant_label: string;
    sku: string;
    country: string;
  };
}

export interface OrderMetadata {
  order_type: string;
  shop_order_id: string;
  shop_order_label: string;
  shop_fulfilled_at: string;
}

export interface Shipment {
  carrier: string;
  number: string;
  url: string;
  delivered_at: string;
}

export interface Blueprint {
  id: number;
  title: string;
  description: string;
  brand: string;
  model: string;
  images: string[];
}

export interface PrintProvider {
  id: number;
  title: string;
  location: {
    address1: string;
    address2: string;
    city: string;
    country: string;
    region: string;
    zip: string;
  };
}

// API Functions

/**
 * Get all shops for the authenticated user
 */
export async function getShops(): Promise<PrintifyShop[]> {
  return printifyFetch<PrintifyShop[]>('/shops.json');
}

/**
 * Get all products for a shop
 */
export async function getProducts(shopId: string): Promise<{ data: PrintifyProduct[] }> {
  return printifyFetch<{ data: PrintifyProduct[] }>(`/shops/${shopId}/products.json`);
}

/**
 * Get a single product
 */
export async function getProduct(shopId: string, productId: string): Promise<PrintifyProduct> {
  return printifyFetch<PrintifyProduct>(`/shops/${shopId}/products/${productId}.json`);
}

/**
 * Create an order
 */
export async function createOrder(
  shopId: string,
  orderData: {
    external_id: string;
    label: string;
    line_items: {
      product_id: string;
      variant_id: number;
      quantity: number;
    }[];
    shipping_method: number;
    send_shipping_notification: boolean;
    address_to: Address;
  }
): Promise<PrintifyOrder> {
  return printifyFetch<PrintifyOrder>(`/shops/${shopId}/orders.json`, {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

/**
 * Get shipping costs for an order
 */
export async function getShippingCosts(
  shopId: string,
  data: {
    line_items: { product_id: string; variant_id: number; quantity: number }[];
    address_to: { country: string; region: string; zip: string };
  }
): Promise<{ standard: number; express: number }> {
  return printifyFetch<{ standard: number; express: number }>(
    `/shops/${shopId}/orders/shipping.json`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

/**
 * Get available blueprints (product types)
 */
export async function getBlueprints(): Promise<Blueprint[]> {
  return printifyFetch<Blueprint[]>('/catalog/blueprints.json');
}

/**
 * Get print providers for a blueprint
 */
export async function getPrintProviders(blueprintId: number): Promise<PrintProvider[]> {
  return printifyFetch<PrintProvider[]>(`/catalog/blueprints/${blueprintId}/print_providers.json`);
}

/**
 * Upload an image to Printify
 */
export async function uploadImage(
  fileName: string,
  base64Image: string
): Promise<{ id: string; file_name: string; height: number; width: number }> {
  return printifyFetch<{ id: string; file_name: string; height: number; width: number }>(
    '/uploads/images.json',
    {
      method: 'POST',
      body: JSON.stringify({
        file_name: fileName,
        contents: base64Image,
      }),
    }
  );
}
