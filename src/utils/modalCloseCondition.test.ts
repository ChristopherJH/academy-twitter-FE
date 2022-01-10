import modalCloseCondition from "./modalCloseCondition";

test("Returns unchanged array if search is empty or array of elements which include the search term", () => {
  expect(
    modalCloseCondition(
      {
        title: "a",
        author: "a",
        url: "a",
        description: "a",
        content: "a",
        recommended_description: "a",
        recommended: "recommended",
        user_id: 0,
        stage_id: 1,
      },
      [
        {
          recommendation_id: 1,
          title: "a",
          author: "a",
          url: "a.com",
          description: "a",
          content: "a",
          time: "a",
          recommended_description: "a",
          recommended: "a",
          likes: 0,
          dislikes: 0,
          user_id: 0,
          stage_id: 0,
        },
      ]
    )
  ).toStrictEqual(true);
  expect(
    modalCloseCondition(
      {
        title: "",
        author: "a",
        url: "a",
        description: "a",
        content: "a",
        recommended_description: "a",
        recommended: "recommended",
        user_id: 0,
        stage_id: 1,
      },
      [
        {
          recommendation_id: 1,
          title: "a",
          author: "a",
          url: "a.com",
          description: "a",
          content: "a",
          time: "a",
          recommended_description: "a",
          recommended: "a",
          likes: 0,
          dislikes: 0,
          user_id: 0,
          stage_id: 0,
        },
      ]
    )
  ).toStrictEqual(false);
  expect(
    modalCloseCondition(
      {
        title: "a",
        author: "a",
        url: "a",
        description: "",
        content: "a",
        recommended_description: "a",
        recommended: "recommended",
        user_id: 0,
        stage_id: 0,
      },
      [
        {
          recommendation_id: 1,
          title: "a",
          author: "a",
          url: "a.com",
          description: "a",
          content: "a",
          time: "a",
          recommended_description: "a",
          recommended: "a",
          likes: 0,
          dislikes: 0,
          user_id: 0,
          stage_id: 0,
        },
      ]
    )
  ).toStrictEqual(false);
  expect(
    modalCloseCondition(
      {
        title: "a",
        author: "a",
        url: "a.com",
        description: "",
        content: "a",
        recommended_description: "a",
        recommended: "recommended",
        user_id: 0,
        stage_id: 1,
      },
      [
        {
          recommendation_id: 1,
          title: "a",
          author: "a",
          url: "a.com",
          description: "a",
          content: "a",
          time: "a",
          recommended_description: "a",
          recommended: "a",
          likes: 0,
          dislikes: 0,
          user_id: 0,
          stage_id: 0,
        },
      ]
    )
  ).toStrictEqual(false);
});
