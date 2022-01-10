import { FormType } from "../components/CreateRecommendation";
import RecommendationType from "../types/RecommendationType";

export default function modalCloseCondition(
  formContent: FormType,
  recommendations: RecommendationType[]
): boolean {
  if (
    Object.values(formContent).includes("") ||
    formContent.stage_id === 0 ||
    recommendations.map((rec) => rec.url).includes(formContent.url)
  ) {
    return false;
  } else {
    return true;
  }
}
