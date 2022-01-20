import signupModalCloseCondition from "./signupModalCloseCondition";

const users = [
  {
    user_id: 1,
    name: "Neill",
    is_faculty: true,
  },
  {
    user_id: 2,
    name: "Martha",
    is_faculty: false,
  },
  {
    user_id: 3,
    name: "Chris",
    is_faculty: false,
  },
  {
    user_id: 4,
    name: "David",
    is_faculty: false,
  },
  {
    user_id: 5,
    name: "Julian",
    is_faculty: true,
  },
];

test("Returns false in the first array element when empty string is used as name", () => {
  expect(
    signupModalCloseCondition(
      {
        name: "",
        is_faculty: false,
      },
      users
    )
  ).toStrictEqual([false, true]);
});

test("Returns true for both array elements when a valid, unique string is used as name", () => {
  expect(
    signupModalCloseCondition(
      {
        name: "non existing user",
        is_faculty: false,
      },
      users
    )
  ).toStrictEqual([true, true]);
});

test("Returns false second element when a prexisting name is used", () => {
  expect(
    signupModalCloseCondition(
      {
        name: "Martha",
        is_faculty: false,
      },
      users
    )
  ).toStrictEqual([true, false]);
});
