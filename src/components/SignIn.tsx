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

  useEffect(() => {
    async function getStudyList() {
      if (typeof apiBaseURL === "string") {
        const studyListResponse = await axios.get(
          `${apiBaseURL}study_list/${props.signedInUser.user_id}`
          // `http://localhost:4000/study_list/4`
        );
        // console.log(studyListResponse)
        // console.log(`${apiBaseURL}study_list/${props.signedInUser.user_id}`)
        console.log("Signed in user:", props.signedInUser);
        props.setStudyList(studyListResponse.data.data);
      }
    }
    getStudyList();
    // eslint-disable-next-line
  }, [props.signedInUser]);

  const handleLogin = () => {
    const user = props.users.filter((user) => user.name === selectedUser)[0];
    //console.log('User: ', user)
    props.setSignedInUser(user);
    //console.log(props.signedInUser.user_id, selectedUser, props.signedInUser)
    // console.log(props.users.filter((user) => user.name === selectedUser)[0])
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
                      aria-label="default"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                    >
                      <option selected>guest</option>
                      {props.users.map((user) => (
                        <option key={user.user_id}>{user.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
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
          onClick={() => handleLogout()}
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
