import { useState } from "react";
import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import RecommendationType from "../types/RecommendationType";
import Form from "./Form";

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
  const [postPressed, setPostPressed] = useState<boolean>(false);

  return (
    <>
      {props.signedInUser.user_id !== 0 && (
        <>
          <button
            type="button"
            className="btn btn-outline-light mr-2"
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
                    onClick={() => setPostPressed(false)}
                  >
                    <span id="closeModal" aria-hidden="true">
                      &times;
                    </span>
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
                  postPressed={postPressed}
                  setPostPressed={setPostPressed}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
