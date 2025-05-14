
export default async function API<T>(
  url: string,
  method: "GET",
  body?: unknown
): Promise<T> {

  const ENDPOINT = process.env.NEXT_PUBLIC_API
  try {
    const headers = {
      "Content-Type": "application/json",
    }
    const response = await fetch(`${ENDPOINT}/${url}`, {
      method,
      headers: { ...headers },
      body: body ? JSON.stringify(body) : undefined
    })

    if (!response.ok) {
      throw new Error("Fetch failed", {
        cause: response.status
      });
    } else {
      return await response.json() as T
    }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error("", {
        cause: error.cause
      });
    }
    throw error
  }
}

