import React from "react";
import { SpeedDial, SpeedDialAction, styled } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

const SpeedDialTemplate = ({ actions }) => {
  return (
    <CustomSpeedDial
      ariaLabel="SpeedDial playground example"
      icon={<TuneIcon />}
      direction="left"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </CustomSpeedDial>
  );
};

export default SpeedDialTemplate;

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    margin: 0.4rem;
    background-color: #032303;

    &:hover {
      background-color: apple;
    }
  }
`;
