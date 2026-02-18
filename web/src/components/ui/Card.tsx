import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import Button from "./Button";

type CardProps = {
  title: string;
  children: React.ReactNode;
  isConcertCard?: boolean;
  isFormCard?: boolean;
  onClickButton?: () => void;
};

export default function CustomCard({
  title,
  children,
  isConcertCard,
  onClickButton,
  isFormCard,
}: CardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={title}
        sx={{
          "& .MuiCardHeader-content": {
            borderBottom: "1px solid #C2C2C2",
            display: "inline-block",
            paddingBottom: "4px",
          },
          "& .MuiCardHeader-title": {
            color: "#1692EC",
            fontSize: "28px",
            fontWeight: 500,
          },
        }}
      ></CardHeader>
      <CardContent sx={{ paddingY: 0 }}>{children}</CardContent>

      {isConcertCard && (
        <CardContent sx={{ display: "flex", alignItems: "bottom" }}>
          <div className="flex justify-between items-center w-full">
            <div>
              <PersonIcon sx={{ color: "grey" }} />
              <span className="ml-1"> 200</span>
            </div>
            <Button type="delete" onClick={onClickButton}></Button>
          </div>
        </CardContent>
      )}

      {isFormCard && (
        <CardContent sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="save" onClick={onClickButton}></Button>
        </CardContent>
      )}
    </Card>
  );
}
