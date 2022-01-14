import { useEffect, useState } from "react";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import listOfContentTypes from "../utils/listOfContentTypes";
import axios from "axios";
import { config } from "dotenv";
import RecommendationType from "../types/RecommendationType";
import modalCloseCondition from "../utils/modalCloseCondition";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

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

interface CreateRecommendationProps {
  signedInUser: UserType;
  tags: TagType[];
  stages: StageType[];
  setRecommendations: (input: RecommendationType[]) => void;
  recommendations: RecommendationType[];
  setTags: (input: TagType[]) => void;
}

export interface FormType {
  title: string;
  author: string;
  url: string;
  description: string;
  content: string;
  recommended_description: string;
  recommended: string;
  stage_id: number;
  user_id: number;
}

export default function CreateRecommendation(
  props: CreateRecommendationProps
): JSX.Element {
  const [formContent, setFormContent] = useState<FormType>(defaultForm);

  return (
    <>
      {props.signedInUser.user_id !== 0 && (
        <>
          <button
            type="button"
            className="btn btn-outline-light"
            id="create-button"
            data-toggle="modal"
            data-backdrop="static"
            data-keyboard="false"
            data-target="#createRecModal"
            onClick={() => {
              setFormContent({
                ...formContent,
                user_id: props.signedInUser.user_id,
              });
            }}
          >
            Create
          </button>

          <div
            className="modal fade create-modal"
            id="createRecModal"
            tab-index="-1"
            role="dialog"
            aria-labelledby="createRecModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title" id="createRecModalLabel">
                    Create a recommendation
                  </h2>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <Form
                  tags={props.tags}
                  stages={props.stages}
                  formContent={formContent}
                  setFormContent={setFormContent}
                  signedInUser={props.signedInUser}
                  setRecommendations={props.setRecommendations}
                  recommendations={props.recommendations}
                  setTags={props.setTags}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

interface FormProps {
  tags: TagType[];
  stages: StageType[];
  formContent: FormType;
  setFormContent: (input: FormType) => void;
  signedInUser: UserType;
  setRecommendations: (input: RecommendationType[]) => void;
  recommendations: RecommendationType[];
  setTags: (input: TagType[]) => void;
}

function Form(props: FormProps): JSX.Element {
  const tagNamesArray = props.tags.map((tag) => tag.name);
  const filteredTagNames = Array.from(new Set(tagNamesArray));
  const [postPressed, setPostPressed] = useState<boolean>(false);
  const [tagArray, setTagArray] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const handleAddTags = async (id: number) => {
    try {
      for (const tag of tagArray) {
        await axios.post(`${apiBaseURL}tags/${id}`, { name: tag });
      }
      const tagsResponse = await axios.get(`${apiBaseURL}tags`);
      props.setTags(tagsResponse.data.data);
      setTagArray([]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleAddTags(props.recommendations[0].recommendation_id);
    // eslint-disable-next-line
  }, [props.recommendations]);

  const handlePostRecommendation = async () => {
    // e.preventDefault();
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
      setPostPressed(false);
    } catch (err) {
      setPostPressed(true);
    }
  };

  return (
    <form onSubmit={() => handlePostRecommendation}>
      <div className="modal-body">
        <div className="form-group">
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
          {postPressed && props.formContent.title === "" && (
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
          {postPressed && props.formContent.author === "" && (
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
          {postPressed && props.formContent.url === "" && (
            <div className="alert alert-danger" id="url-alert" role="alert">
              URL cannot be empty
            </div>
          )}
          {postPressed &&
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
          {postPressed && props.formContent.description === "" && (
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
              onClick={(e) => deleteTag(e, tagArray, tag, setTagArray)}
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
          {postPressed && props.formContent.recommended_description === "" && (
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
            {postPressed && props.formContent.stage_id === 0 && (
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
        </div>
      </div>
    </form>
  );
}
function deleteTag(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  tagArray: string[],
  tag: string,
  setTagArray: (input: string[]) => void
): void {
  e.preventDefault();
  const index = tagArray.indexOf(tag);
  tagArray.splice(index, 1);
  setTagArray([...tagArray]);
}
