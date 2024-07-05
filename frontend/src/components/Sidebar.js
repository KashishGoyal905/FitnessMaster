// Sidebar.js
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Badge,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inbox as InboxIcon,
  ViewKanban as KanbanIcon,
  People as UsersIcon,
  Store as ProductsIcon,
  Login as SignInIcon,
  AppRegistration as SignUpIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer className=''
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { width: 250, backgroundColor: '#2c2c2c', color: '#fff' }
      }}
    >
      <List>
          <ListItem>
            <ListItemIcon>
              <DashboardIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="User Dashboard" />
          </ListItem>
        <Link to={'profile'}>
          <ListItem button>
            <ListItemIcon>
              <KanbanIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
            <Badge color="primary" style={{ marginLeft: 'auto' }} />
          </ListItem>
        </Link>
        <Link to={'classes'}>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Classes" />
            <Badge badgeContent={3} color="secondary" />
          </ListItem>
        </Link>
        <Divider />
      </List>
    </Drawer>
  );
};

const PermanentSidebar = () => {
  return (
    <div style={{ width: 250, backgroundColor: '#2c2c2c', height: '100vh', color: '#fff' }}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Link to={'profile'}>
          <ListItem button>
            <ListItemIcon>
              <KanbanIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
            <Badge color="primary" style={{ marginLeft: 'auto' }} />
          </ListItem>
        </Link>
        <Link to={'classes'}>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Classes" />
            <Badge badgeContent={3} color="secondary" />
          </ListItem>
        </Link>
        <Divider />
      </List>
    </div>
  );
};

const ResponsiveSidebar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      {isMobile ? (
        <>
          <IconButton onClick={() => setOpen(true)} style={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
          <Sidebar open={open} onClose={() => setOpen(false)} />
        </>
      ) : (
        <PermanentSidebar />
      )}
    </>
  );
};

export default ResponsiveSidebar;
