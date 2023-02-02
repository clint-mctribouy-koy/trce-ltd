import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Button, MenuItem, Menu } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state";
import { bindTrigger, bindMenu } from "material-ui-popup-state/hooks";
import PopupState from "material-ui-popup-state";

function NavigationBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color="black"
        >
          TRCE
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>

          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <IconButton
                  variant="contained"
                  sx={{ color: "black" }}
                  {...bindTrigger(popupState)}
                >
                  <PersonOutline />
                </IconButton>

                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Profile</MenuItem>
                  <MenuItem onClick={popupState.close}>My Account</MenuItem>
                  <MenuItem onClick={popupState.close}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>

          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <IconButton
                  variant="contained"
                  sx={{ color: "black" }}
                  {...bindTrigger(popupState)}
                >
                  <MenuOutlined />
                </IconButton>

                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>TRCE</MenuItem>
                  <MenuItem onClick={popupState.close}>NAGARE</MenuItem>
                  <MenuItem onClick={popupState.close}>BAND.03</MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </Box>
      </Box>
    </Box>
  );
}

export default NavigationBar;
