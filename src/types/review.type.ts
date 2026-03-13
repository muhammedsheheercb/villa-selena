export interface Review {
  relativePublishTimeDescription: string;
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  text: {
    text: string;
  };
  rating: number;
}
