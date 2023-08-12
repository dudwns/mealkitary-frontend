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
      className=" bg-white border-t-2 border-green-700 rounded-tr-3xl rounded-tl-3xl w-full max-w-xl fixed left-0 right-0 mx-auto bottom-0 flex justify-center items-center z-20"
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
