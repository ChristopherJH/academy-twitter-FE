import Recommendations from "./components/Recommendations";
import axios from "axios";
import { useState, useEffect } from "react";
import RecommendationType from "./types/RecommendationType";
import TagType from "./types/TagType";
import StageType from "./types/StageType";
import { config } from "dotenv";
import UserType from "./types/UserType";
//import CommentType from "./types/CommentType";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import SignIn from "./components/SignIn";
import StudyListType from "./types/StudyListType";
import CreateRecommendation from "./components/CreateRecommendation";

config();

const apiBaseURL = process.env.REACT_APP_API_BASE;

function App(): JSX.Element {
  const [recommendations, setRecommendations] = useState<RecommendationType[]>(
    []
  );
  const [tags, setTags] = useState<TagType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [stages, setStages] = useState<StageType[]>([]);
  //const [comments, setComments] = useState<CommentType[]>([]);
  const [studyList, setStudyList] = useState<StudyListType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [dropDownValue, setDropDownValue] = useState("");
  const [signedInUser, setSignedInUser] = useState<UserType>({
    name: "guest",
    user_id: 0,
    is_faculty: false,
  });

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    if (typeof apiBaseURL === "string") {
      const recommendationsResponse = await axios.get(
        `${apiBaseURL}recommendations`
      );
      const tagsResponse = await axios.get(`${apiBaseURL}tags`);
      const userResponse = await axios.get(`${apiBaseURL}users`);
      const stageResponse = await axios.get(`${apiBaseURL}stages`);
      //const commentResponse = await axios.get(`${apiBaseURL}comments`);
      setRecommendations(recommendationsResponse.data.data);
      setTags(tagsResponse.data.data);
      setUsers(userResponse.data.data);
      setStages(stageResponse.data.data);
      //setComments(commentResponse.data.data);
    }
  }

  return (
    <div className="main">
      <div className="header">
        <h1>Academy Twitter</h1>
        <div className="user-space">
          <CreateRecommendation
            signedInUser={signedInUser}
            tags={tags}
            stages={stages}
          />

          {signedInUser.user_id !== 0 && <h5>👤{signedInUser.name}</h5>}

          <SignIn
            users={users}
            setSignedInUser={setSignedInUser}
            signedInUser={signedInUser}
            studyList={studyList}
            setStudyList={setStudyList}
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
        setRecommendations={setRecommendations}
        studyList={studyList}
      />
      {recommendations.length > 0 && (
        <Recommendations
          recommendations={recommendations}
          tags={tags}
          stages={stages}
          users={users}
          searchText={searchText}
          dropDownValue={dropDownValue}
        />
      )}{" "}
      :
    </div>
  );
}

export default App;
