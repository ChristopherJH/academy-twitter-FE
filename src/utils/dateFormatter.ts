export default function dateFormatter(date: string): string {
  return date.replace("T", " ").split(".")[0];
}
