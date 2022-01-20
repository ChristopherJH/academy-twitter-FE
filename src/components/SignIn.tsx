import { useCallback, useEffect, useState } from "react";
import UserType from "../types/UserType";
import axios from "axios";
import StudyListType from "../types/StudyListType";
import { config } from "dotenv";

config();

interface SignInProps {
  users: UserType[];
  setUsers: (input: UserType[]) => void;
  signedInUser: UserType;
  setSignedInUser: (input: UserType) => void;
  studyList: StudyListType[];
  setStudyList: (input: StudyListType[]) => void;
  setStudyListClicked: (input: boolean) => void;
}

interface signUpInterface {
  name: string;
  is_faculty: boolean;
}

const defaultSignup = {
  name: "",
  is_faculty: false,
};

const apiBaseURL = process.env.REACT_APP_API_BASE;

export default function SignIn(props: SignInProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<string>("guest");
  const [signUpContent, setSignUpContent] =
    useState<signUpInterface>(defaultSignup);
  const [signupAttempt, setSignupAttempt] = useState<boolean>(false);
  const [signupPressed, setSignupPressed] = useState<boolean>(false);

  //destructure props (so that any change to props wont cause a rerender) so now: signedInUser = props.signedInUser
  const { signedInUser, setStudyList } = props;

  //useCallback makes it so getStudyList's reference does not change during renders, making it okay to put in the useEffect dependency array
  const getStudyList = useCallback(async () => {
    if (typeof apiBaseURL === "string") {
      const studyListResponse = await axios.get(
        `${apiBaseURL}study_list/${signedInUser.user_id}`
      );

      console.log("Signed in user:", signedInUser);
      setStudyList(studyListResponse.data.data);
    }
  }, [signedInUser, setStudyList]);

  //then add getStudyList to the dependency array without lint error
  useEffect(() => {
    getStudyList();
    localStorage.setItem("signedInUser", JSON.stringify(props.signedInUser));
  }, [props.signedInUser, getStudyList]);

  const { users, setSignedInUser } = props;
  const handleLogin = useCallback(() => {
    if (selectedUser !== "guest") {
      const user = users.filter((user) => user.name === selectedUser)[0];
      setSignedInUser(user);
    }
  }, [selectedUser, users, setSignedInUser]);

  useEffect(() => {
    handleLogin();
  }, [signupAttempt, handleLogin]);

  const handleSignup = async () => {
    try {
      await axios.post(`${apiBaseURL}users`, signUpContent);
      const userResponse = await axios.get(`${apiBaseURL}users`);
      props.setUsers(userResponse.data.data);
      setSelectedUser(signUpContent.name);
      setSignUpContent(defaultSignup);
      setSignupAttempt(!signupAttempt);
      setSignupPressed(false);
    } catch (err) {
      console.log(err);
      setSignupPressed(true);
    }
  };

  const handleLogout = () => {
    props.setSignedInUser({
      name: "guest",
      user_id: 0,
      is_faculty: false,
    });
    setSelectedUser("guest");
    props.setStudyListClicked(false);
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
                  <div className="container-fluid">
                    <div className="signin-popup-main">
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

                    <div className="signup-area">
                      <button
                        id="see-signup-button"
                        type="button"
                        data-toggle="collapse"
                        data-target="#viewSignup"
                        aria-expanded="false"
                        aria-controls="#viewSignup"
                      >
                        Create a new user
                      </button>
                      <div className="collapse" id="viewSignup">
                        <div className="name-and-signup-button">
                          <input
                            value={signUpContent.name}
                            type="text"
                            className="form-control"
                            placeholder="Enter new user's name"
                            onChange={(e) =>
                              setSignUpContent({
                                ...signUpContent,
                                name: e.target.value,
                              })
                            }
                          />
                          <button
                            className="btn btn-custom"
                            data-dismiss="modal"
                            onClick={() => handleSignup()}
                          >
                            Sign-up
                          </button>
                        </div>
                        <div className="signup-input-alerts">
                          {signupPressed && signUpContent.name === "" && (
                            <div
                              className="alert alert-danger"
                              id="description-alert"
                              role="alert"
                            >
                              Name cannot be empty
                            </div>
                          )}
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="facultySwitch"
                            onChange={(e) =>
                              setSignUpContent({
                                ...signUpContent,
                                is_faculty: !signUpContent.is_faculty,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="facultySwitch"
                          >
                            Faculty
                          </label>
                        </div>
                      </div>
                    </div>
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
