import { v4 as uuidv4 } from "uuid";
import { useState, createContext } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This Item is from context",
      rating: 10,
    },
    {
      id: 2,
      text: "This Item is from context 2",
      rating: 3,
    },
    {
      id: 3,
      text: "This Item is from context 7",
      rating: 7,
    },
  ]);

  //Add feedback
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  //update feedback item
  const updateFeedback = (id, updatedItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  //set item to be updateed
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  //deleteFeedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit, //the actual feedback state that holds the item
        deleteFeedback,
        addFeedback,
        editFeedback, //the function that runs when edit icon is clicked
        updateFeedback,
      }}
    >
      {" "}
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
