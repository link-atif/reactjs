import React from "react";
import { Box, Button } from "@material-ui/core";
import SearchBox from "../../components/common/SearchBox";
import UserDropdown from "../../container/UserDropdown";
import BotModel from "./BotModel"

const ChatBot = () => {
    return (
        <>
            <header className="dashboard-header header-new">
                <div className="header-search-main">
                    <SearchBox />

                    <UserDropdown />
                </div>

            </header>

            <div className="dashboard-main">


                <div>
                    <BotModel />
                </div>
            </div>
        </>
    );
};

export default ChatBot;
