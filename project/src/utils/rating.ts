export function countRatingStars(rating: number): string {
  return `${20 * Math.round(rating)}%`;
}
