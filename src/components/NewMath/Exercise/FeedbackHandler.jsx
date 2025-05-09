import React from "react";
import SimpleFeedback from "../../SimpleFeedback/SimpleFeedback.jsx";

export default function FeedbackHandler({ showFeedback, isWrong, data, setShowFeedback, loadNewQuestion }) {
  return (
    showFeedback && (
      <SimpleFeedback
        message={
          isWrong
            ? <p>{"טעית, תשובה שגויה - התשובה הנכונה היא " + data.solution}</p>
            : "כל הכבוד, תשובה נכונה"
        }
        color={isWrong ? "red" : "green"}
        autoCloseTime={isWrong ? null : 2000}
        onClose={() => {
          setShowFeedback(false);
          if (isWrong) loadNewQuestion();
        }}
      />
    )
  );
}
