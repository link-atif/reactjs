import React from "react";
import "antd/dist/antd.css";
import { Result } from "antd";
import FooterCopyright from "../../container/FooterCopyright";
import UserDropdown from "../../container/UserDropdown";
import SearchBox from "../../components/common/SearchBox";
import RobortIcon from "../../assets/images/404-img.svg";
import { SmileOutlined } from "@ant-design/icons";
import { Box, Button } from "@material-ui/core";

const Error404 = () => {
  return (
    <>
      <Box>
        <Box
          className="line-chart-outer-crd"
          style={{
            minHeight: "100vh",
            backgroundColor: "rgba(10, 226, 179, 0.2)",
          }}
        >
          <Result
            icon={<img src={RobortIcon} style={{ borderRadius: "50%" }} />}
            title={
              <span style={{ color: "#0ae2b3", fontWeight: "500" }}>
                Look Like You're lost in space
              </span>
            }
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button href="/" className="new-coman-btn">
                Back Home
              </Button>
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default Error404;
