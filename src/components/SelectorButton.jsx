import React from "react";

const SelectorButton = ({ buttonNames, chooseWhatToType, selectionType }) => {
  switch (selectionType) {
    case "Film Title":
      return buttonNames.map((buttonName) => (
        <button
          onClick={() => chooseWhatToType(buttonName.title)}
          key={buttonName.id}
        >
          {buttonName.title}
        </button>
      ));
    case "Description":
      return buttonNames.map((buttonName) => (
        <button
          onClick={() => chooseWhatToType(buttonName.description)}
          key={buttonName.id}
        >
          {buttonName.description}
        </button>
      ));
    case "Director":
      return buttonNames.map((buttonName) => (
        <button
          onClick={() => chooseWhatToType(buttonName.director)}
          key={buttonName.id}
        >
          {buttonName.director}
        </button>
      ));
    default:
      return buttonNames.map((buttonName) => (
        <button
          onClick={() => chooseWhatToType(buttonName.title)}
          key={buttonName.id}
        >
          {buttonName.title}
        </button>
      ));
  }
};

export default SelectorButton;
