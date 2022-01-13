import dateFormatter from "./dateFormatter";

test("Returns unchanged array if search is empty or array of elements which include the search term", () => {
  expect(dateFormatter("2022-01-04T16:08:19.274Z")).toStrictEqual(
    "2022-01-04 16:08"
  );
});
