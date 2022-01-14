export default function deleteTag(tagArray: string[], tag: string): string[] {
  const index = tagArray.indexOf(tag);
  if (index !== -1) {
    tagArray.splice(index, 1);
  }
  return tagArray;
}
