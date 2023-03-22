import { createContext, useContext, useReducer } from "react";
// import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const Initial_State = {
    ChatId: "null",
    user: {},
  };
  const ChatReducer = (state, action) => {
    switch (action.type) {
      case "ChangeUser": {
        return {
          user: action.payload,
          ChatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      }

      default: {
        return state;
      }
    }
  };
  const [state, dispatch] = useReducer(ChatReducer, Initial_State);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
