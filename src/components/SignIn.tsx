import { useEffect, useState } from "react";
import UserType from "../types/UserType";
import axios from "axios";
import StudyListType from "../types/StudyListType";
import { config } from "dotenv";

config();

interface SignInProps {
  users: UserType[];
  signedInUser: UserType;
  setSignedInUser: (input: UserType) => void;
  studyList: StudyListType[];
  setStudyList: (input: StudyListType[]) => void;
}

const apiBaseURL = process.env.REACT_APP_API_BASE;

export default function SignIn(props: SignInProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<string>("guest");

  async function getStudyList() {
    if (typeof apiBaseURL === "string") {
      const studyListResponse = await axios.get(
        `${apiBaseURL}study_list/${props.signedInUser.user_id}`
      );

      props.setStudyList(studyListResponse.data.data);
    }
  }

  useEffect(() => {
    getStudyList();
    localStorage.setItem("signedInUser", JSON.stringify(props.signedInUser));

    // eslint-disable-next-line
  }, [props.signedInUser]);

  const handleLogin = () => {
    const user = props.users.filter((user) => user.name === selectedUser)[0];
    props.setSignedInUser(user);
  };

  const handleLogout = () => {
    props.setSignedInUser({
      name: "guest",
      user_id: 0,
      is_faculty: false,
    });
    setSelectedUser("guest");
  };

  return (
    <div>
      {props.signedInUser.user_id === 0 && (
        <div>
          <button
            type="button"
            className="btn btn-outline-light"
            id="signin-button"
            data-toggle="modal"
            data-target="#signInModal"
          >
            Sign In
          </button>
          <div
            className="modal signin-modal"
            tab-index="-1"
            role="dialog"
            id="signInModal"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign In</h5>
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
                  <div className="container-fluid signin-popup-main">
                    <select
                      className="form-select form-select-lg mb-3 form-control"
                      id="users-dropdown-select"
                      aria-label="default"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                    >
                      <option>guest</option>
                      {props.users.map((user) => (
                        <option key={user.user_id}>{user.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-custom"
                      data-dismiss="modal"
                      id="modal-signin-button"
                      onClick={() =>
                        selectedUser === "guest"
                          ? console.log("guest cant log in")
                          : handleLogin()
                      }
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.signedInUser.user_id !== 0 && (
        <button
          className="btn btn-outline-light"
          id="signout-button"
          onClick={() => handleLogout()}
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
