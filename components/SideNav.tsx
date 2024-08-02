import {
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import {
  ListItemButtonStyled,
  NestedListItemButtonStyled,
} from "./StyledComponents";

export default function SideNav() {
  const [openReport, setOpenReport] = useState(false);
  const [openTransport, setOpenTransport] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openCreateBill, setOpenCreateBill] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleTabClick = (tab: any) => {
    if (activeTab === tab) {
      return;
    } else {
      setActiveTab(tab);
    }
  };

  const handleSubTabClick = (subTab: any) => {
    if (activeSubTab === subTab) {
      return;
    } else {
      setActiveSubTab(subTab);
    }
  };

  return (
    <List onClick={(e) => e.stopPropagation()}>
      <Divider sx={{ mt: "5rem", display: { xs: "block", md: "none" } }} />

      <ListItemButtonStyled
        active={activeTab === "createBill"}
        onClick={() => {
          setOpenCreateBill(!openCreateBill);
          handleTabClick("createBill");
        }}
      >
        <ListItemIcon>
          <KeyboardDoubleArrowRightIcon
            color={activeTab === "createBill" ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="Tạo đơn hàng" />
        {openCreateBill ? <ExpandLess /> : <ExpandMore />}
      </ListItemButtonStyled>
      <Collapse in={openCreateBill} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NestedListItemButtonStyled
            active={activeSubTab === "autoBill"}
            onClick={(e) => {
              e.stopPropagation();
              handleSubTabClick("autoBill");
            }}
          >
            <ListItemText primary="Tạo đơn tự động" />
          </NestedListItemButtonStyled>
          <NestedListItemButtonStyled
            active={activeSubTab === "manualBill"}
            onClick={(e) => {
              e.stopPropagation();
              handleSubTabClick("manualBill");
            }}
          >
            <ListItemText primary="Tạo đơn thủ công" />
          </NestedListItemButtonStyled>
        </List>
      </Collapse>

      <ListItemButtonStyled
        active={activeTab === "report"}
        onClick={() => {
          setOpenReport(!openReport);
          handleTabClick("report");
        }}
      >
        <ListItemIcon>
          <AssessmentIcon
            color={activeTab === "report" ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="Báo cáo" />
        {openReport ? <ExpandLess /> : <ExpandMore />}
      </ListItemButtonStyled>
      <Collapse in={openReport} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NestedListItemButtonStyled
            active={activeSubTab === "overall"}
            onClick={(e) => {
              e.stopPropagation();
              handleSubTabClick("overall");
            }}
          >
            <ListItemText primary="Tổng quan" />
          </NestedListItemButtonStyled>
        </List>
      </Collapse>

      <ListItemButtonStyled
        active={activeTab === "transport"}
        onClick={() => {
          setOpenTransport(!openTransport);
          handleTabClick("transport");
        }}
      >
        <ListItemIcon>
          <LocalShippingIcon
            color={activeTab === "transport" ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="Vận chuyển" />
        {openTransport ? <ExpandLess /> : <ExpandMore />}
      </ListItemButtonStyled>
      <Collapse in={openTransport} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NestedListItemButtonStyled
            active={activeSubTab === "transport"}
            onClick={(e) => {
              e.stopPropagation();
              handleSubTabClick("transport");
            }}
          >
            <ListItemText primary="Quản lý đơn hàng" />
          </NestedListItemButtonStyled>

          <NestedListItemButtonStyled
            active={activeSubTab === "billUpload"}
            onClick={(e) => {
              e.stopPropagation();
              handleSubTabClick("billUpload");
            }}
          >
            <ListItemText primary="Upload đơn hàng" />
          </NestedListItemButtonStyled>

          <NestedListItemButtonStyled
            active={activeSubTab === "forControl"}
            onClick={(e) => {
              e.stopPropagation();
              handleSubTabClick("forControl");
            }}
          >
            <ListItemText primary="Đối soát" />
          </NestedListItemButtonStyled>
        </List>
      </Collapse>

      <ListItemButtonStyled
        active={activeTab === "settings"}
        onClick={() => {
          setOpenSetting(!openSetting);
          handleTabClick("settings");
        }}
      >
        <ListItemIcon>
          <SettingsIcon
            color={activeTab === "settings" ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="Cấu hình" />
        {openSetting ? <ExpandLess /> : <ExpandMore />}
      </ListItemButtonStyled>
      <Collapse in={openSetting} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NestedListItemButtonStyled
            active={activeSubTab === "account"}
            onClick={(e) => {
              e.stopPropagation();
              handleSubTabClick("account");
            }}
          >
            <ListItemText primary="Tài khoản" />
          </NestedListItemButtonStyled>

          <NestedListItemButtonStyled
            active={activeSubTab === "storage"}
            onClick={(e) => {
              e.stopPropagation();
              handleSubTabClick("storage");
            }}
          >
            <ListItemText primary="Kho hàng" />
          </NestedListItemButtonStyled>
        </List>
      </Collapse>

      <ListItemButtonStyled
        active={activeTab === "logout"}
        onClick={(e) => {
          handleTabClick("logout");
          // Fetch Logout
        }}
      >
        <ListItemIcon>
          <LogoutIcon color={activeTab === "logout" ? "primary" : "inherit"} />
        </ListItemIcon>
        <ListItemText primary="Đăng xuất" />
      </ListItemButtonStyled>
    </List>
  );
}
