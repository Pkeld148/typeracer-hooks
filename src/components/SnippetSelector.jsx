import React, { useState } from "react";
import SelectorButton from "./SelectorButton";

const selections = [
  { id: 1, title: "Film Title" },
  { id: 2, title: "Description" },
  { id: 3, title: "Director" },
];

const SnippetSelector = ({ films, chooseSnippet, whatToType, setWhatToType }) => {
//   const [whatToType, setWhatToType] = useState(null);

  const chooseWhatToType = (selection) => {
    setWhatToType(selection);
  };

  return (
    <div>
      {!whatToType ? (
        <div>
          <h4>What would you like to type?</h4>
          <SelectorButton
            chooseWhatToType={chooseWhatToType}
            buttonNames={selections}
          />
        </div>
      ) : null}

      {whatToType && films ? (
        <div>
          <h4>Choose One</h4>
          <SelectorButton
            buttonNames={films}
            chooseWhatToType={chooseSnippet}
            selectionType={whatToType}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SnippetSelector;
