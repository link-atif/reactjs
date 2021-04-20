import React, { useState } from "react";
import { TextField } from "@material-ui/core";

import searchImg from "../../../assets/images/search.svg";

import { useHistory } from "react-router-dom";
import BotModel from "../../../container/ChatBot/BotModel"


const SearchBox = () => {
  let history = useHistory();
  const [filter, setFilter] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filter.length > 3) {
      const query = filter.replace(/\s+/g, "-");
      history.push(`/search-results?query=${query}`);
    }
  };
  return (
    <>
      <div className="seach-form new-search-bx">
        <img src={searchImg} alt="Search" />
        <TextField
          id="standard-search"
          placeholder="Search"
          type="search"
          className="mt-0"
          onChange={(e) => setFilter(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* <BotModel /> */}

    </>
  );
};

export default SearchBox;
