import RecommendationType from "../../types/RecommendationType";

export default function searchBarFilter(
  recommendations: RecommendationType[],
  searchText: string
): RecommendationType[] {
  return recommendations.filter(
    (recommendation) =>
      recommendation.title.toLowerCase().includes(searchText.toLowerCase()) ||
      recommendation.author.toLowerCase().includes(searchText.toLowerCase()) ||
      recommendation.description
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );
}
