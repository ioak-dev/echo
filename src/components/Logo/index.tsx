import React, { useEffect, useState } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import "./style.scss";
import echoWhiteSmall from "../../images/echo_white_small.svg";
import echoWhiteText from "../../images/echo_white_text.svg";
import echoBlackSmall from "../../images/echo_black_small.svg";
import echoBlackText from "../../images/echo_black_text.svg";
import echoBlack from "../../images/echo_black.svg";

interface Props {
  variant: "full" | "short";
}

const Logo = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="logo">
      <div className="logo--image">
        {profile.theme === "basicui-light" && (
          <img src={echoBlackSmall} alt="Echo logo" />
        )}
        {profile.theme === "basicui-dark" && (
          <img src={echoWhiteSmall} alt="Echo logo" />
        )}
      </div>
      {props.variant === "full" && (
        <div className="logo--text">
          {profile.theme === "basicui-light" && (
            <img src={echoBlackText} alt="Echo logo" />
          )}
          {profile.theme === "basicui-dark" && (
            <img src={echoWhiteText} alt="Echo logo" />
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
