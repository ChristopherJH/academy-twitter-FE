import deleteTag from "./deleteTag";

test("Deletes the tag 'google' when clicked", () => {
  expect(deleteTag(["google", "website", "hello"], "google")).toStrictEqual([
    "website",
    "hello",
  ]);
});

test("Deletes the tag 'website' when clicked", () => {
  expect(deleteTag(["google", "website", "hello"], "website")).toStrictEqual([
    "google",
    "hello",
  ]);
});

test("Deletes the tag 'bla' (that doesn't exist) when clicked", () => {
  expect(deleteTag(["google", "website", "hello"], "bla")).toStrictEqual([
    "google",
    "website",
    "hello",
  ]);
});
