import { Box } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

type SummaryBoxType = "total" | "reserve" | "cancel";

type SummaryBoxProps = {
  value?: number;
  type: SummaryBoxType;
};

type SummaryBoxConfig = {
  icon: React.ReactNode;
  backgroundColor: string;
  description: string;
};

const SummaryBoxConfig: Record<SummaryBoxType, SummaryBoxConfig> = {
  total: {
    icon: (
      <PersonOutlineIcon
        sx={{ fontSize: { xs: 25, sm: 30, lg: 45 }, color: "#fff" }}
      />
    ),
    backgroundColor: "#0070A4",
    description: "Total of seats",
  },
  reserve: {
    icon: (
      <EmojiEventsIcon
        sx={{ fontSize: { xs: 25, sm: 30, lg: 45 }, color: "#fff" }}
      />
    ),
    backgroundColor: "#00A58B",
    description: "Reserve",
  },
  cancel: {
    icon: (
      <HighlightOffIcon
        sx={{ fontSize: { xs: 25, sm: 30, lg: 45 }, color: "#fff" }}
      />
    ),
    backgroundColor: "#E84E4E",
    description: "Cancel",
  },
};

export default function SummaryBox({ value, type }: SummaryBoxProps) {
  const config = SummaryBoxConfig[type];
  return (
    <Box
      sx={{
        backgroundColor: config.backgroundColor,
        borderRadius: "8px",
        padding: { xs: "4px", sm: "4px", md: "8px", lg: "16px" },
        marginBottom: "16px",
        aspectRatio: "2 / 1",
      }}
    >
      <div className="flex flex-col items-center justify-between h-full text-white desktop:gap-1 ">
        {config.icon}
        <p className="text-sm"> {config.description}</p>
        <p className="text-lg tablet:text-xl desktop:text-5xl ">{value}</p>
      </div>
    </Box>
  );
}
