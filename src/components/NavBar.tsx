import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FaceIcon from '@mui/icons-material/Face';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const NavBar = () => {
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      showLabels
      className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center w-full max-w-xl mx-auto bg-white border-t-2 border-blue-600  rounded-tr-3xl rounded-tl-3xl"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}>
      <BottomNavigationAction
        label="검색"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="찜"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="주문"
        icon={<AddCircleIcon />}
      />
      <BottomNavigationAction
        label="영수증"
        icon={<ReceiptLongIcon />}
      />
      <BottomNavigationAction
        label="마이페이지"
        icon={<FaceIcon />}
      />
    </BottomNavigation>
  );
};

export default NavBar;
