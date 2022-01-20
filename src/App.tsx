import Recommendations from "./components/Recommendations";
import axios from "axios";
import { useState, useEffect } from "react";
import RecommendationType from "./types/RecommendationType";
import TagType from "./types/TagType";
import StageType from "./types/StageType";
import { config } from "dotenv";
import UserType from "./types/UserType";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import SignIn from "./components/SignIn";
import StudyListType from "./types/StudyListType";
import CreateRecommendation from "./components/CreateRecommendation";
import studyListFilter from "./utils/filters/studyListFilter";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

function App(): JSX.Element {
  const [recommendations, setRecommendations] = useState<RecommendationType[]>(
    []
  );
  const [tags, setTags] = useState<TagType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [stages, setStages] = useState<StageType[]>([]);
  const [studyList, setStudyList] = useState<StudyListType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [dropDownValue, setDropDownValue] = useState("");
  const [userStudyList, setUserStudyList] = useState<RecommendationType[]>([]);
  const [studyListClicked, setStudyListClicked] = useState(false);
  const [dropDownArray, setDropDownArray] = useState<string[]>([]);
  const [signedInUser, setSignedInUser] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("signedInUser");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return {
        name: "guest",
        user_id: 0,
        is_faculty: false,
      };
    }
  });

  useEffect(() => {
    function updateStudyList() {
      setUserStudyList(studyListFilter(studyList, recommendations));
    }
    updateStudyList();
  }, [studyList, recommendations]);

  async function getAllData() {
    if (typeof apiBaseURL === "string") {
      const recommendationsResponse = await axios.get(
        `${apiBaseURL}recommendations`
      );
      const tagsResponse = await axios.get(`${apiBaseURL}tags`);
      const userResponse = await axios.get(`${apiBaseURL}users`);
      const stageResponse = await axios.get(`${apiBaseURL}stages`);
      setRecommendations(recommendationsResponse.data.data);
      setTags(tagsResponse.data.data);
      setUsers(userResponse.data.data);
      setStages(stageResponse.data.data);
    }
  }

  useEffect(() => {
    console.log("getAllData called");
    getAllData();
  }, []);

  return (
    <div className="main">
      <div className="header">
        {!studyListClicked ? (
          <h1 id="page-title">
            <strong>✨ Resorcery ✨</strong>
          </h1>
        ) : (
          <h1 id="study-list-title">✨ Study List ✨</h1>
        )}

        <div className="user-space">
          {signedInUser.user_id !== 0 && (
            <h5 id="users-name">
              <i
                className="fas fa-user-alt mr-2"
                style={{ fontSize: "24px" }}
              ></i>
              Hello, {signedInUser.name}
            </h5>
          )}
          <CreateRecommendation
            signedInUser={signedInUser}
            tags={tags}
            stages={stages}
            setRecommendations={setRecommendations}
            recommendations={recommendations}
            setTags={setTags}
          />

          <SignIn
            users={users}
            setUsers={setUsers}
            setSignedInUser={setSignedInUser}
            signedInUser={signedInUser}
            studyList={studyList}
            setStudyList={setStudyList}
            setStudyListClicked={setStudyListClicked}
          />
        </div>
      </div>
      <NavigationBar
        searchText={searchText}
        setSearchText={setSearchText}
        tags={tags}
        dropDownValue={dropDownValue}
        setDropDownValue={setDropDownValue}
        recommendations={recommendations}
        studyList={studyList}
        signedInUser={signedInUser}
        setUserStudyList={setUserStudyList}
        studyListClicked={studyListClicked}
        setStudyListClicked={setStudyListClicked}
        dropDownArray={dropDownArray}
        setDropDownArray={setDropDownArray}
      />
      {/* If recommendations has been loaded */}
      {recommendations.length > 0 && (
        <Recommendations
          recommendations={!studyListClicked ? recommendations : userStudyList}
          tags={tags}
          stages={stages}
          users={users}
          searchText={searchText}
          dropDownValue={dropDownValue}
          signedInUser={signedInUser}
          setRecommendations={setRecommendations}
          studyList={studyList}
          setStudyList={setStudyList}
          dropDownArray={dropDownArray}
          setDropDownArray={setDropDownArray}
        />
      )}
      {/* If user has clicked study list and it is empty */}
      {studyListClicked && userStudyList.length === 0 && (
        <p id="no-sl-items">You have no items in your study list</p>
      )}
    </div>
  );
}
export default App;
