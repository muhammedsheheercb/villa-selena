// Define environment configuration
export const ENV = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  DEFAULT_REVALIDATE: 600, //  10 min default revalidation
};

// Extended options to include revalidation and URL handling
export type FetcherOptions<TBODY = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: TBODY;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  revalidate?: number | false;
  revalidationTag?: string;
  baseUrlType?: "BASE_URL";
};

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  msg: string;
  serverTime: string;
  data: T;
}

export type FetcherResponse<T> = {
  data: T | null;
  error: Error | null;
};

export async function fetcher<T = unknown, TBODY = unknown>({
  endpoint,
  options = {},
}: {
  endpoint: string;
  options: FetcherOptions<TBODY>;
}): Promise<FetcherResponse<T>> {
  const {
    method = "GET",
    headers = {},
    body,
    cache,
    next,
    revalidate = ENV.DEFAULT_REVALIDATE,
    revalidationTag,
    baseUrlType = "BASE_URL",
  } = options;

  // Construct full URL
  const baseUrl = ENV[baseUrlType] ?? ENV.BASE_URL;
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    // Prepare headers
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    // Prepare Next.js configuration
    const nextConfig: NextFetchRequestConfig = {
      ...next,
      revalidate,
      tags: revalidationTag ? [revalidationTag] : next?.tags,
    };

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
      cache,
      next: nextConfig,
      body: body ? JSON.stringify(body) : undefined,
    };

    // Perform the fetch
    const response = await fetch(url, fetchOptions);

    // Handle non-OK responses
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorBody}`,
      );
    }

    // Parse JSON response
    const data = (await response.json()) as T;

    return {
      data,
      error: null,
    };
  } catch (error) {
    // Handle any errors during fetch
    console.error("Fetcher error:", error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
