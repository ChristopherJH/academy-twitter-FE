import { useState } from "react";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import listOfContentTypes from "../utils/listOfContentTypes";
import axios from "axios";
import { config } from "dotenv";
import RecommendationType from "../types/RecommendationType";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

interface CreateRecommendationProps {
  signedInUser: UserType;
  tags: TagType[];
  stages: StageType[];
  setRecommendations: (input: RecommendationType[]) => void;
}

interface FormType {
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
  const [formContent, setFormContent] = useState<FormType>({
    title: "",
    author: "",
    url: "",
    description: "",
    content: "",
    recommended_description: "",
    recommended: "",
    user_id: 0,
    stage_id: 8,
  });

  return (
    <>
      {props.signedInUser.user_id !== 0 && (
        <>
          <button
            type="button"
            className="btn btn-outline-light"
            data-toggle="modal"
            data-target="#exampleModal"
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
            className="modal fade"
            id="exampleModal"
            tab-index="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Create a recommendation
                  </h5>
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
}

function Form(props: FormProps): JSX.Element {
  const tagNamesArray = props.tags.map((tag) => tag.name);
  const filteredTagNames = Array.from(new Set(tagNamesArray));

  const handlePostRecommendation = async () => {
    // e.preventDefault();
    try {
      const response = await axios.post(
        `${apiBaseURL}recommendations`,
        props.formContent
      );
      const recommendationsResponse = await axios.get(
        `${apiBaseURL}recommendations`
      );
      props.setRecommendations(recommendationsResponse.data.data);
      console.log(response);
    } catch (err) {
      console.log(err);
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
        </div>
        <div className="form-group">
          <h3>Add tags to your post</h3>
          <div className="tag-dropdown">
            <select className="form-select form-control" aria-label="default">
              <option selected>Filter by tag</option>
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
          />
        </div>
        <button className="btn btn-primary">Add tag</button>
        <p>[List of currently selected tags]</p>
        <div className="form-group">
          <h3>Reason for posting</h3>
          <input
            type="text"
            placeholder="Why recommended (or not)"
            className="form-control"
            id="why-recommended"
            value={props.formContent.recommended_description}
            onChange={(e) =>
              props.setFormContent({
                ...props.formContent,
                recommended_description: e.target.value,
              })
            }
          />
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
              <option selected>Stage of mark</option>
              {props.stages.map((stage, index) => (
                <option key={index} value={stage.stage_id}>
                  {stage.stage_description}
                </option>
              ))}
            </select>
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
              <option selected>Recommended</option>
              <option selected>Not recommended</option>
              <option selected>Promising</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={() => handlePostRecommendation()}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
