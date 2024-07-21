import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inbox as InboxIcon,
  ViewKanban as KanbanIcon,
} from '@mui/icons-material';

import { IconButton } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { width: 215, backgroundColor: '#2c2c2c', color: '#fff' }
      }}
    >
      <List>
        <Link to={'/dashboard'} onClick={onClose}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to={'/dashboard/profile'} onClick={onClose}>
          <ListItem button>
            <ListItemIcon>
              <KanbanIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
            <Badge color="primary" style={{ marginLeft: 'auto' }} />
          </ListItem>
        </Link>
        <Link to={'/dashboard/classes'} onClick={onClose}>
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
    <div style={{ backgroundColor: '#2c2c2c', height: '100vh', color: '#fff' }}>
      <List>
        <Link to={'/dashboard'}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to={'/dashboard/profile'}>
          <ListItem button>
            <ListItemIcon>
              <KanbanIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
            <Badge color="primary" style={{ marginLeft: 'auto' }} />
          </ListItem>
        </Link>
        <Link to={'/dashboard/classes'}>
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

const ResponsiveSidebar = ({ open, setOpen }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ position: 'fixed', zIndex: 1100 }}
          >
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
