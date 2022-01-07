import StageType from "../types/StageType";
import TagType from "../types/TagType";
import UserType from "../types/UserType";
import listOfContentTypes from "../utils/listOfContentTypes";

interface CreateRecommendationProps {
  signedInUser: UserType;
  tags: TagType[];
  stages: StageType[];
}

export default function CreateRecommendation(
  props: CreateRecommendationProps
): JSX.Element {
  return (
    <>
      {props.signedInUser.user_id !== 0 && (
        <>
          <button
            type="button"
            className="btn btn-outline-light"
            data-toggle="modal"
            data-target="#exampleModal"
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
                <div className="modal-body">
                  <Form tags={props.tags} stages={props.stages} />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Post
                  </button>
                </div>
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
}

function Form(props: FormProps): JSX.Element {
  const tagNamesArray = props.tags.map((tag) => tag.name);
  const filteredTagNames = Array.from(new Set(tagNamesArray));
  return (
    <form>
      <div className="form-group">
        <h3>Resource Description</h3>
        <input
          type="text"
          placeholder="Resource title"
          className="form-control"
          id="resource-name"
        />
        <input
          type="text"
          placeholder="Author/Company name"
          className="form-control"
          id="author-name"
        />
        <input
          type="text"
          placeholder="URL"
          className="form-control"
          id="url"
        />
        <label htmlFor="content-type">Content type</label>
        <select className="form-control" id="content-type">
          {listOfContentTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <textarea
          className="form-control"
          id="resource-description"
          rows={3}
          placeholder="Description of resource"
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
        />
        <div className="stage-dropdown">
          <select className="form-select form-control" aria-label="default">
            <option selected>Stage of mark</option>
            {props.stages.map((stage, index) => (
              <option key={index}>{stage.stage_description}</option>
            ))}
          </select>
        </div>
        <div className="recommended-dropdown">
          <select className="form-select form-control" aria-label="default">
            <option selected>Recommended</option>
            <option selected>Not recommended</option>
            <option selected>Promising</option>
          </select>
        </div>
      </div>
    </form>
  );
}
