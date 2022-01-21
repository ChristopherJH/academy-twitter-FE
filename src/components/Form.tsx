import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import RecommendationType from "../types/RecommendationType";
import { useEffect, useState } from "react";
import axios from "axios";
import listOfContentTypes from "../utils/listOfContentTypes";
import deleteTag from "../utils/deleteTag";
import modalCloseCondition from "../utils/modalCloseCondition";
import { FormType } from "../types/FormType";

const defaultForm = {
  title: "",
  author: "",
  url: "",
  description: "",
  content: "Article",
  recommended_description: "",
  recommended: "Recommended",
  user_id: 0,
  stage_id: 0,
};

interface FormProps {
  tags: TagType[];
  stages: StageType[];
  formContent: FormType;
  setFormContent: (input: FormType) => void;
  signedInUser: UserType;
  setRecommendations: (input: RecommendationType[]) => void;
  recommendations: RecommendationType[];
  setTags: (input: TagType[]) => void;
  setPostPressed: (input: boolean) => void;
  postPressed: boolean;
}

const apiBaseURL = process.env.REACT_APP_API_BASE;

export default function Form(props: FormProps): JSX.Element {
  const tagNamesArray = props.tags.map((tag) => tag.name);
  // Turning tagNamesArray into a set to remove duplicates
  // and then transform it back into an array
  const filteredTagNames = Array.from(new Set(tagNamesArray));
  // States
  // Has the post successfully been posted
  const [postSubmitted, setPostSubmitted] = useState<boolean>(false);
  // Array of tags to be added to the post
  const [tagArray, setTagArray] = useState<string[]>([]);
  // Input field for user typing in a new tag
  const [tagInput, setTagInput] = useState<string>("");

  const { recommendations, setTags } = props;
  useEffect(() => {
    // Adding all the tags from tagArray to our post
    const handleAddTags = async (id: number) => {
      try {
        for (const tag of tagArray) {
          await axios.post(`${apiBaseURL}tags/${id}`, { name: tag });
        }
        const tagsResponse = await axios.get(`${apiBaseURL}tags`);
        setTags(tagsResponse.data.data);
        setTagArray([]);
        setPostSubmitted(false);
      } catch (err) {
        console.log(err);
      }
    };

    // Only if a recommendation is posted, add the tags to it
    recommendations.length > 0 &&
      postSubmitted &&
      handleAddTags(recommendations[0].recommendation_id);
  }, [recommendations, setTags, tagArray, postSubmitted]);

  // Posting our filled in form
  const handlePostRecommendation = async () => {
    try {
      const response = await axios.post(
        `${apiBaseURL}recommendations`,
        props.formContent
      );
      console.log(response);
      const recommendationsResponse = await axios.get(
        `${apiBaseURL}recommendations`
      );
      props.setRecommendations(recommendationsResponse.data.data);
      props.setFormContent(defaultForm);

      // Remove alerts if post was successfully submitted
      props.setPostPressed(false);
      setPostSubmitted(true);
    } catch (err) {
      // If there was an error posting the recommendation, display alerts
      props.setPostPressed(true);
    }
  };

  return (
    <form onSubmit={() => handlePostRecommendation}>
      <div className="modal-body">
        <div className="form-group">
          {/* Title, author, url, description, content type */}
          <h3>Resource Description</h3>
          <input
            type="text"
            placeholder="Resource title"
            className="form-control"
            id="resource-name"
            value={props.formContent.title}
            onChange={(e) =>
              props.setFormContent({
                ...props.formContent,
                title: e.target.value,
              })
            }
          />
          {/* Title alert */}
          {props.postPressed && props.formContent.title === "" && (
            <div className="alert alert-danger" id="title-alert" role="alert">
              Title cannot be empty
            </div>
          )}
          <input
            type="text"
            placeholder="Author/Company name"
            className="form-control"
            id="author-name"
            value={props.formContent.author}
            onChange={(e) =>
              props.setFormContent({
                ...props.formContent,
                author: e.target.value,
              })
            }
          />
          {/* Author alert */}
          {props.postPressed && props.formContent.author === "" && (
            <div className="alert alert-danger" id="author-alert" role="alert">
              Author name cannot be empty
            </div>
          )}
          <input
            type="text"
            placeholder="URL"
            className="form-control"
            id="url"
            value={props.formContent.url}
            onChange={(e) =>
              props.setFormContent({
                ...props.formContent,
                url: e.target.value,
              })
            }
          />
          {/* URL alert */}
          {props.postPressed && props.formContent.url === "" && (
            <div className="alert alert-danger" id="url-alert" role="alert">
              URL cannot be empty
            </div>
          )}
          {props.postPressed &&
            props.recommendations
              .map((rec) => rec.url)
              .includes(props.formContent.url) && (
              <div
                className="alert alert-danger"
                id="url-duplicate-alert"
                role="alert"
              >
                Resource has already been posted
              </div>
            )}
          <label htmlFor="content-type">Content type</label>
          <select
            className="form-control"
            id="content-type"
            value={props.formContent.content}
            onChange={(e) =>
              props.setFormContent({
                ...props.formContent,
                content: e.target.value,
              })
            }
          >
            {listOfContentTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <textarea
            className="form-control"
            id="resource-description"
            rows={3}
            placeholder="Description of resource"
            value={props.formContent.description}
            onChange={(e) =>
              props.setFormContent({
                ...props.formContent,
                description: e.target.value,
              })
            }
          ></textarea>
          {props.postPressed && props.formContent.description === "" && (
            <div
              className="alert alert-danger"
              id="description-alert"
              role="alert"
            >
              Description cannot be empty
            </div>
          )}
        </div>
        <div className="form-group">
          <h3>Add tags to your post</h3>
          <div className="tag-dropdown">
            <select
              className="form-select form-control"
              aria-label="default"
              value="Choose a tag"
              onChange={(e) => {
                if (!tagArray.includes(e.target.value))
                  setTagArray([...tagArray, e.target.value]);
              }}
            >
              <option>Choose a tag</option>
              {filteredTagNames.map((name, index) => (
                <option key={index}>{name}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Add a new tag"
            className="form-control"
            id="new-tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
        </div>
        <button
          className="btn btn-custom"
          id="add-tag-button"
          data-backdrop="static"
          data-keyboard="false"
          onClick={(e) => {
            e.preventDefault();
            if (
              !tagArray.includes(tagInput) &&
              !tagInput.includes(" ") &&
              tagInput.length > 0
            )
              setTagArray([...tagArray, tagInput]);
            setTagInput("");
          }}
        >
          Add tag
        </button>
        <div id="tag-buttons">
          {tagArray.map((tag, index) => (
            <button
              className="btn btn-warning mx-2 tag-button"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setTagArray([...deleteTag(tagArray, tag)]);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="form-group">
          <h3>Reason for posting</h3>
          <input
            type="text"
            placeholder="Why recommended (or not)"
            className="form-control"
            id="why-recommended"
            value={props.formContent.recommended_description}
            onChange={(e) => {
              props.setFormContent({
                ...props.formContent,
                recommended_description: e.target.value,
              });
            }}
          />
          {props.postPressed &&
            props.formContent.recommended_description === "" && (
              <div
                className="alert alert-danger"
                id="recommended-description-alert"
                role="alert"
              >
                Recommended description cannot be empty
              </div>
            )}

          <div className="stage-dropdown">
            <select
              className="form-select form-control"
              aria-label="default"
              value={props.formContent.stage_id}
              onChange={(e) =>
                props.setFormContent({
                  ...props.formContent,
                  stage_id: parseInt(e.target.value),
                })
              }
            >
              <option>Stage of mark</option>
              {props.stages.map((stage, index) => (
                <option key={index} value={stage.stage_id}>
                  {stage.stage_description}
                </option>
              ))}
            </select>
            {props.postPressed && props.formContent.stage_id === 0 && (
              <div className="alert alert-danger" id="stage-alert" role="alert">
                Stage cannot be empty
              </div>
            )}
          </div>
          <div className="recommended-dropdown">
            <select
              className="form-select form-control"
              aria-label="default"
              value={props.formContent.recommended}
              onChange={(e) =>
                props.setFormContent({
                  ...props.formContent,
                  recommended: e.target.value,
                })
              }
            >
              <option>Recommended</option>
              <option>Not recommended</option>
              <option>Promising</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          {modalCloseCondition(props.formContent, props.recommendations) ? (
            <button
              type="button"
              className="btn btn-custom"
              data-dismiss="modal"
              onClick={() => {
                handlePostRecommendation();
              }}
            >
              Post
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-custom"
              onClick={() => handlePostRecommendation()}
            >
              Post
            </button>
          )}
        </div>{" "}
        {/* Form group */}
      </div>{" "}
      {/* Modal body */}
    </form>
  );
}
