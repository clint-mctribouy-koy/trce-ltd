import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Button, MenuItem, Menu } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { setIsCartOpen } from "../../state";
import { bindTrigger, bindMenu } from "material-ui-popup-state/hooks";
import PopupState from "material-ui-popup-state";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import React, { useState, useEffect } from "react";

function NavigationBar({ logout, isAuthenticated }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [redirect, setRedirect] = useState(false);

  const logout_user = () => {
    logout();
    // setRedirect(true); - fix this redirect condition
  };

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

          {isAuthenticated ? (
            <Box sx={{ "&:hover": { cursor: "pointer" } }} color="black">
              <a className="nav-link" href="#!" onClick={() => logout_user()}>
                Logout
              </a>
            </Box>
          ) : (
            <Box
              onClick={() => navigate("/login")}
              sx={{ "&:hover": { cursor: "pointer" } }}
              color="black"
            >
              Log In
            </Box>
          )}

          {/* <PopupState variant="popover" popupId="demo-popup-menu"> */}
          {/* {(popupState, isAuthenticated) => (
              <>
                <IconButton
                  variant="contained"
                  sx={{ color: "black" }}
                  {...bindTrigger(popupState)}
                >
                  <PersonOutline />
                </IconButton> */}

          {/* <Menu {...bindMenu(popupState)}>
                  {isAuthenticated ? (
                    <div>
                      <MenuItem onClick={popupState.close}>Log In</MenuItem>
                      <MenuItem onClick={popupState.close}>Profile</MenuItem>
                      <MenuItem onClick={popupState.close}>My Account</MenuItem>
                      <MenuItem onClick={() => dispatch(logout_user())}>
                        Logout
                      </MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem onClick={() => navigate("/login")}>
                        Log in
                      </MenuItem>
                    </div>
                  )}
                </Menu> */}
          {/* </>
            )} */}
          {/* </PopupState> */}
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
                {redirect ? <Navigate to="/" replace /> : <></>}
              </>
            )}
          </PopupState>
        </Box>
      </Box>
    </Box>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
