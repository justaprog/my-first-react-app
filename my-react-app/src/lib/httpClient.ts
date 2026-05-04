/**
 * A simple HTTP client utility function for making GET requests and parsing JSON responses.
 * This function uses the Fetch API to perform the request and handles basic error checking.
 * It is designed to be reusable across the application for fetching data from APIs.
* @param url The URL to send the GET request to.
* @returns A promise that resolves to the parsed JSON response of type T.
* @throws An error if the request fails or if the response is not OK.
*/
export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
