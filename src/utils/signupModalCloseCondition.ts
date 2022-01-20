import { signUpInterface } from "../components/SignIn";
import UserType from "../types/UserType";

//returns an array of two boolean values, the first represents if the input is empty, the second if the input is not unique:
//[empty?, unique?]

export default function signupModalCloseCondition(
  signupContent: signUpInterface,
  users: UserType[]
): boolean[] {
  return [
    signupContent.name !== "",
    !users.map((user) => user.name).includes(signupContent.name),
  ];
}
