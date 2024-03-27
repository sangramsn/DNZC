import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "foH8wpGS9U_ESe01FZX4NC2VnYQEZBlbdJ7lE59jfug",
  headers: { "X-Custom-Header": "weather-app" },
});

/**
 * The function fetchPhotos fetches 3 random photos of cats from the Unsplash API.
 * @returns The `fetchPhotos` function is returning a call to the `unsplash.photos.getRandom` method
 * with a query for "cat" and a count of 3.
 */
export const fetchPhotos = () => {
  return unsplash.photos.getRandom({ query: "cat", count: 3 });
};
