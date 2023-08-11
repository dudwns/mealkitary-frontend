import { useRouter } from "next/router";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FaceIcon from "@mui/icons-material/Face";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface NavProps {
  backBtn?: boolean;
  title?: string;
  children: React.ReactNode;
}

export default function Nav() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      showLabels
      className="fixed bottom-0 w-full border-t-2 border-green-700 pt-2 rounded-tl-3xl rounded-tr-3xl"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="검색" icon={<SearchIcon />} />
      <BottomNavigationAction label="찜" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="주문" icon={<AddCircleIcon />} />
      <BottomNavigationAction label="영수증" icon={<ReceiptLongIcon />} />
      <BottomNavigationAction label="마이페이지" icon={<FaceIcon />} />
    </BottomNavigation>
  );
}
