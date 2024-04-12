import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import { Collapse } from '@mui/material';
import { SideMenuData } from '../SideMenuData/SideMenuData';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Link } from 'react-router-dom';
import styles from "./Sidebar.module.css"



const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function Sidebar({ open, handleDrawerClose }) {

    const [isCollapse, setIsCollapse] = useState(null)
    const theme = useTheme();

    const handleCollapse = (clickedIndex) => {
        if (isCollapse === clickedIndex) {
            setIsCollapse(null);
        } else {
            setIsCollapse(clickedIndex);
        }
    };

    return (
        <Drawer sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        }}
            variant="persistent"
            anchor="left"
            open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {SideMenuData.map((menu) => (
                    (menu.subNav !== undefined) ? <div className={styles.links} key={menu.id} >
                        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleCollapse(menu.id)}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.title} sx={{ opacity: open ? 1 : 0 }} />
                                {(menu.subNav) ? isCollapse === menu.id ? <ExpandLessIcon /> : <ExpandMoreIcon /> : ""}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={isCollapse === menu.id} timeout={'auto'} unmountOnExit>
                            {menu.subNav && menu.subNav.map((subMenu) => (
                                <Link className={styles.links} key={subMenu.id} to={subMenu.path}>
                                    <ListItem disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 3,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {subMenu.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={subMenu.title} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </Collapse>
                        <Divider />
                    </div> : <Link className={styles.links} key={menu.id} to={menu.path}>
                        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => handleCollapse(menu.id)}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.title} sx={{ opacity: open ? 1 : 0 }} />
                                {(menu.subNav) ? isCollapse === menu.id ? <ExpandLessIcon /> : <ExpandMoreIcon /> : ""}
                            </ListItemButton>
                        </ListItem>
                        <Collapse in={isCollapse === menu.id} timeout={'auto'} unmountOnExit>
                            {menu.subNav && menu.subNav.map((subMenu) => (
                                <Link className={styles.links} key={subMenu.id} to={subMenu.path}>
                                    <ListItem disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 3,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {subMenu.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={subMenu.title} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </Collapse>
                        <Divider />
                    </Link>
                ))}
            </List>
        </Drawer>
    )
}
