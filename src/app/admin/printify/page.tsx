'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, ExternalLink, RefreshCw, Upload, AlertTriangle } from 'lucide-react';

interface Shop {
  id: number;
  title: string;
  salesChannel: string;
}

interface ConnectionStatus {
  connected: boolean;
  shops?: Shop[];
  error?: string;
  message?: string;
}

interface Blueprint {
  id: number;
  title: string;
  description: string;
  brand: string;
  images: string[];
}

interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  visible: boolean;
  blueprintId: number;
  variants: {
    id: number;
    title: string;
    price: number;
    cost: number;
    isEnabled: boolean;
    isAvailable: boolean;
  }[];
  images: {
    src: string;
    isDefault: boolean;
  }[];
}

interface BulkResult {
  file: string;
  status: string;
  productId?: string;
  error?: string;
  frame?: string;
}

interface BulkUploadResponse {
  message: string;
  success: number;
  errors: number;
  results: BulkResult[];
}

export default function PrintifyAdminPage() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [products, setProducts] = useState<PrintifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBlueprints, setLoadingBlueprints] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkResults, setBulkResults] = useState<BulkUploadResponse | null>(null);
  const [framedUploading, setFramedUploading] = useState(false);
  const [framedResults, setFramedResults] = useState<BulkUploadResponse | null>(null);

  const checkConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/printify');
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({ connected: false, error: 'Failed to connect to API' });
    }
    setLoading(false);
  };

  const fetchBlueprints = async () => {
    setLoadingBlueprints(true);
    try {
      const res = await fetch('/api/printify/blueprints');
      const data = await res.json();
      setBlueprints(data.blueprints || []);
    } catch (error) {
      console.error('Error fetching blueprints:', error);
    }
    setLoadingBlueprints(false);
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/printify/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoadingProducts(false);
  };

  const startBulkUpload = async () => {
    if (!confirm('Dette vil uploade alle billeder og oprette produkter i Printify. Fortsæt?')) {
      return;
    }

    setBulkUploading(true);
    setBulkResults(null);

    try {
      const res = await fetch('/api/printify/bulk-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setBulkResults(data);

      // Refresh products list after bulk upload
      if (data.success > 0) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Bulk upload error:', error);
      setBulkResults({
        message: 'Failed to upload',
        success: 0,
        errors: 1,
        results: [{ file: 'all', status: 'error', error: String(error) }],
      });
    }

    setBulkUploading(false);
  };

  const startFramedUpload = async () => {
    if (!confirm('Dette vil oprette 102 indramrede produkter (34 billeder × 3 rammefarver). Det tager ca. 10-15 minutter. Fortsæt?')) {
      return;
    }

    setFramedUploading(true);
    setFramedResults(null);

    try {
      const res = await fetch('/api/printify/bulk-create-framed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setFramedResults(data);

      if (data.success > 0) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Framed upload error:', error);
      setFramedResults({
        message: 'Failed to upload',
        success: 0,
        errors: 1,
        results: [{ file: 'all', status: 'error', error: String(error) }],
      });
    }

    setFramedUploading(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-olive hover:text-charcoal transition-colors">
            &larr; Back to site
          </Link>
          <h1 className="text-3xl font-light text-charcoal mt-4 mb-2">
            Printify Setup
          </h1>
          <p className="text-olive">
            Connect and manage your Printify integration
          </p>
        </div>

        {/* Connection Status */}
        <div className="bg-white border border-sand p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-charcoal">Connection Status</h2>
            <button
              onClick={checkConnection}
              disabled={loading}
              className="text-sm text-olive hover:text-charcoal transition-colors flex items-center gap-1"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-olive">
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking connection...
            </div>
          ) : status?.connected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                Connected to Printify
              </div>

              {status.shops && status.shops.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-charcoal mb-2">Your Shops:</h3>
                  <div className="space-y-2">
                    {status.shops.map((shop) => (
                      <div
                        key={shop.id}
                        className="flex items-center justify-between p-3 bg-sand/20 rounded"
                      >
                        <div>
                          <p className="font-medium text-charcoal">{shop.title}</p>
                          <p className="text-sm text-olive">ID: {shop.id}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-sand rounded text-olive">
                          {shop.salesChannel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                Not connected
              </div>
              {status?.error && (
                <p className="text-sm text-red-600">{status.error}</p>
              )}
              {status?.message && (
                <p className="text-sm text-olive">{status.message}</p>
              )}

              <div className="bg-sand/30 p-4 rounded text-sm">
                <h3 className="font-medium text-charcoal mb-2">Setup Instructions:</h3>
                <ol className="list-decimal list-inside space-y-2 text-olive">
                  <li>
                    Create a Printify account at{' '}
                    <a
                      href="https://printify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal underline inline-flex items-center gap-1"
                    >
                      printify.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>Go to Settings → API → Create new token</li>
                  <li>Copy the token and add to <code className="bg-sand px-1 rounded">.env.local</code>:</li>
                </ol>
                <pre className="mt-3 p-3 bg-charcoal text-cream rounded text-xs overflow-x-auto">
{`PRINTIFY_API_TOKEN=your_token_here
PRINTIFY_SHOP_ID=your_shop_id`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Upload Section */}
        {status?.connected && (
          <div className="bg-white border border-sand p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-charcoal">Bulk Upload Products</h2>
                <p className="text-sm text-olive mt-1">
                  Automatisk upload af alle artwork billeder til Printify
                </p>
              </div>
              <button
                onClick={startBulkUpload}
                disabled={bulkUploading}
                className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {bulkUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploader...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Start Bulk Upload
                  </>
                )}
              </button>
            </div>

            {bulkUploading && (
              <div className="bg-sand/30 p-4 rounded">
                <p className="text-sm text-olive flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploader billeder og opretter produkter. Dette kan tage flere minutter...
                </p>
              </div>
            )}

            {bulkResults && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{bulkResults.success} succesfulde</span>
                  </div>
                  {bulkResults.errors > 0 && (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-5 h-5" />
                      <span className="font-medium">{bulkResults.errors} fejl</span>
                    </div>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {bulkResults.results.map((result, idx) => (
                    <div
                      key={idx}
                      className={`text-sm p-2 rounded flex items-center justify-between ${
                        result.status === 'success'
                          ? 'bg-green-50 text-green-700'
                          : result.status === 'error'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-sand/30 text-olive'
                      }`}
                    >
                      <span>{result.file}</span>
                      <span>
                        {result.status === 'success' && result.productId && (
                          <span className="text-xs">ID: {result.productId.slice(0, 8)}...</span>
                        )}
                        {result.status === 'error' && (
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {result.error?.slice(0, 50)}
                          </span>
                        )}
                        {result.status === 'skipped' && 'Sprunget over'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Framed Products Upload */}
        {status?.connected && (
          <div className="bg-white border border-sand p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium text-charcoal">Framed Products</h2>
                <p className="text-sm text-olive mt-1">
                  Opret indramrede versioner (Sort, Hvid, Eg) - 102 produkter total
                </p>
              </div>
              <button
                onClick={startFramedUpload}
                disabled={framedUploading}
                className="bg-olive text-white px-6 py-3 hover:bg-charcoal transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {framedUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Opretter...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Opret Indramrede Produkter
                  </>
                )}
              </button>
            </div>

            {framedUploading && (
              <div className="bg-sand/30 p-4 rounded">
                <p className="text-sm text-olive flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Opretter 102 indramrede produkter. Dette tager 10-15 minutter...
                </p>
              </div>
            )}

            {framedResults && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{framedResults.success} succesfulde</span>
                  </div>
                  {framedResults.errors > 0 && (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-5 h-5" />
                      <span className="font-medium">{framedResults.errors} fejl</span>
                    </div>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2">
                  {framedResults.results.slice(0, 20).map((result, idx) => (
                    <div
                      key={idx}
                      className={`text-sm p-2 rounded flex items-center justify-between ${
                        result.status === 'success'
                          ? 'bg-green-50 text-green-700'
                          : result.status === 'error'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-sand/30 text-olive'
                      }`}
                    >
                      <span>{result.file} {result.frame && `- ${result.frame}`}</span>
                      <span>
                        {result.status === 'success' && '✓'}
                        {result.status === 'error' && result.error?.slice(0, 30)}
                      </span>
                    </div>
                  ))}
                  {framedResults.results.length > 20 && (
                    <p className="text-sm text-olive">...og {framedResults.results.length - 20} mere</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Blueprints Section */}
        {status?.connected && (
          <div className="bg-white border border-sand p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-charcoal">
                Available Blueprints (Poster/Print)
              </h2>
              <button
                onClick={fetchBlueprints}
                disabled={loadingBlueprints}
                className="text-sm bg-charcoal text-cream px-4 py-2 hover:bg-olive transition-colors flex items-center gap-2"
              >
                {loadingBlueprints ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Load Blueprints'
                )}
              </button>
            </div>

            {blueprints.length > 0 ? (
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {blueprints.map((bp) => (
                  <div
                    key={bp.id}
                    className="flex items-start gap-4 p-3 bg-sand/20 rounded"
                  >
                    {bp.images[0] && (
                      <img
                        src={bp.images[0]}
                        alt={bp.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-charcoal">{bp.title}</p>
                      <p className="text-xs text-olive">ID: {bp.id} • {bp.brand}</p>
                      <p className="text-sm text-olive line-clamp-2 mt-1">
                        {bp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-olive">
                Click &quot;Load Blueprints&quot; to see available poster and print templates
              </p>
            )}
          </div>
        )}

        {/* Shop Products */}
        {status?.connected && (
          <div className="bg-white border border-sand p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-charcoal">
                Your Printify Products
              </h2>
              <button
                onClick={fetchProducts}
                disabled={loadingProducts}
                className="text-sm bg-charcoal text-cream px-4 py-2 hover:bg-olive transition-colors flex items-center gap-2"
              >
                {loadingProducts ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Load Products'
                )}
              </button>
            </div>

            {products.length > 0 ? (
              <div className="grid gap-4 max-h-[500px] overflow-y-auto">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start gap-4 p-4 bg-sand/20 rounded"
                  >
                    {product.images[0] && (
                      <img
                        src={product.images[0].src}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-charcoal">{product.title}</p>
                          <p className="text-xs text-olive">
                            ID: {product.id}
                            {!product.visible && (
                              <span className="ml-2 text-red-500">(Hidden)</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.variants.slice(0, 4).map((variant) => (
                          <span
                            key={variant.id}
                            className="text-xs px-2 py-1 bg-sand rounded text-olive"
                          >
                            {variant.title} - {(variant.price / 100).toFixed(2)} DKK
                          </span>
                        ))}
                        {product.variants.length > 4 && (
                          <span className="text-xs px-2 py-1 bg-sand rounded text-olive">
                            +{product.variants.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-olive">
                Click &quot;Load Products&quot; to see products in your Printify shop
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
