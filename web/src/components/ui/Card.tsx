import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "./Button";

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
          padding: "30px",
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
      <CardContent sx={{ paddingY: 0, paddingInline: "30px" }}>
        {children}
      </CardContent>

      {isConcertCard && (
        <CardContent
          sx={{ display: "flex", alignItems: "bottom", paddingInline: "30px" }}
        >
          <div className="flex justify-between items-center w-full">
            <div>
              <PersonIcon sx={{ color: "grey" }} />
              <span className="ml-1"> 200</span>
            </div>
            <CustomButton type="delete" onClick={onClickButton}></CustomButton>
          </div>
        </CardContent>
      )}

      {isFormCard && (
        <CardContent
          sx={{ display: "flex", justifyContent: "end", paddingInline: "30px" }}
        >
          <CustomButton type="save" onClick={onClickButton}></CustomButton>
        </CardContent>
      )}
    </Card>
  );
}
