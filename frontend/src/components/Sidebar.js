import React, { useContext } from 'react';
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
  Create as CreateIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import authContext from '../context/AuthContext';


const Sidebar = ({ open, onClose }) => {
  const { user } = useContext(authContext);

  const userRole = user.userRole; // Assuming user object has a 'role' property

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
        {userRole === 'user' && (
          <>
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
          </>
        )}
        {userRole === 'admin' && (
          <>
            <Link to={'/dashboard/manage-users'} onClick={onClose}>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Manage Users" />
              </ListItem>
            </Link>
            <Link to={'/dashboard/create-class'} onClick={onClose}>
              <ListItem button>
                <ListItemIcon>
                  <CreateIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Create Class" />
              </ListItem>
            </Link>
          </>
        )}
        <Divider />
      </List>
    </Drawer>
  );
};

const PermanentSidebar = () => {
  const { user } = useContext(authContext);
  const userRole = user.userRole; 

  return (
    <div style={{ backgroundColor: '#2c2c2c', height: '100vh', color: '#fff' }}>
      <List>
        {userRole === 'user' && (
          <>
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
          </>
        )}
        {userRole === 'admin' && (
          <>
            <Link to={'/dashboard/manage-users'}>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Manage Users" />
              </ListItem>
            </Link>
            <Link to={'/dashboard/create-class'}>
              <ListItem button>
                <ListItemIcon>
                  <CreateIcon style={{ color: '#fff' }} />
                </ListItemIcon>
                <ListItemText primary="Create Class" />
              </ListItem>
            </Link>
          </>
        )}
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
            <MenuIcon className='my-[42vh] m-2' />
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
