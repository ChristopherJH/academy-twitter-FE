import { useState } from "react";
import UserType from "../types/UserType";

interface SignInProps {
  users: UserType[];
  signedInUser: UserType;
  setSignedInUser: (input: UserType) => void;
}

export default function SignIn(props: SignInProps): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<string>("");
  return (
    <div>
      {props.signedInUser.user_id === 0 && (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#signInModal"
          >
            Sign In
          </button>
          <div className="modal" tab-index="-1" role="dialog" id="signInModal">
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
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label="default"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                    >
                      <option selected>Filter by tag</option>
                      {props.users.map((user) => (
                        <option key={user.user_id}>{user.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() =>
                      props.setSignedInUser(
                        props.users.filter(
                          (user) => user.name === selectedUser
                        )[0]
                      )
                    }
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.signedInUser.user_id !== 0 && (
        <button
          onClick={() =>
            props.setSignedInUser({
              name: "guest",
              user_id: 0,
              is_faculty: false,
            })
          }
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
