import { useCallback, useEffect, useState } from "react";
import UserType from "../types/UserType";
import axios from "axios";
import StudyListType from "../types/StudyListType";
import { config } from "dotenv";
import signupModalCloseCondition from "../utils/signupModalCloseCondition";

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

export interface signUpInterface {
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
  const [showUniqueAlert, setShowUniqueAlert] = useState<boolean>(false);
  const [showEmptyAlert, setShowEmptyAlert] = useState<boolean>(false);

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

  const handleLogin = () => {
    if (selectedUser !== "guest") {
      const user = props.users.filter((user) => user.name === selectedUser)[0];
      props.setSignedInUser(user);
    }
  };

  useEffect(() => {
    handleLogin();
    // eslint-disable-next-line
  }, [signupAttempt]);

  const handleSignup = async () => {
    try {
      await axios.post(`${apiBaseURL}users`, signUpContent);
      const userResponse = await axios.get(`${apiBaseURL}users`);
      console.log("Get users: ", userResponse.data.data);
      props.setUsers(userResponse.data.data);
      console.log("setUsers done");
      console.log("signupcontent name: ", signUpContent.name);
      setSelectedUser(signUpContent.name); //not setting state
      console.log({ selectedUser });
      console.log("setSelectedUser done");
      setSignUpContent(defaultSignup);
      console.log("setSignUpContent done");
      setSignupAttempt(!signupAttempt);
    } catch (err) {
      console.log(err);
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
                          {signupModalCloseCondition(
                            signUpContent,
                            props.users
                          ).includes(false) ? (
                            <button
                              className="btn btn-custom signup-button"
                              id="signup-button-no-dismiss"
                              onClick={() => {
                                setShowEmptyAlert(false);
                                setShowUniqueAlert(false);

                                !signupModalCloseCondition(
                                  signUpContent,
                                  props.users
                                )[0]
                                  ? setShowEmptyAlert(true)
                                  : !signupModalCloseCondition(
                                      signUpContent,
                                      props.users
                                    )[1]
                                  ? setShowUniqueAlert(true)
                                  : handleSignup();
                              }}
                            >
                              Sign-up
                            </button>
                          ) : (
                            <button
                              className="btn btn-custom signup-button"
                              id="signup-button-dismiss"
                              data-dismiss="modal"
                              onClick={() => {
                                setShowEmptyAlert(false);
                                setShowUniqueAlert(false);
                                handleSignup();
                              }}
                            >
                              Sign-up
                            </button>
                          )}
                        </div>
                        {showUniqueAlert && (
                          <div
                            className="alert alert-danger"
                            id="unique-name-alert"
                            role="alert"
                          >
                            User already exists
                          </div>
                        )}
                        {showEmptyAlert && (
                          <div
                            className="alert alert-danger"
                            id="empty-name-alert"
                            role="alert"
                          >
                            User cannot be empty
                          </div>
                        )}

                        <div className="faculty-checkbox-div mt-1">
                          <label
                            className="form-check-label container"
                            htmlFor="facultySwitch"
                          >
                            Faculty
                            <input
                              type="checkbox"
                              id="facultySwitch"
                              onChange={(e) =>
                                setSignUpContent({
                                  ...signUpContent,
                                  is_faculty: !signUpContent.is_faculty,
                                })
                              }
                            />
                            <span className="checkmark"></span>
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
