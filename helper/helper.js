import { firebaseApiKey } from "./config";

export async function getAllEvents() {
  const response = await fetch(firebaseApiKey);
  const data = await response.json();

  const transformedEventData = [];
  for (const key in data) {
    transformedEventData.push({
      id: key,
      ...data[key],
    });
  }

  return transformedEventData;
}

export async function getFeaturedEvents() {
  const data = await getAllEvents();

  const featuredEventData = data.filter((event) => event.isFeatured);

  return featuredEventData;
}

export async function getEventData(id) {
  const data = await getAllEvents();

  const eventData = data.find((event) => id === event.id);

  return eventData;
}
