import React from 'react';
import { Tab, Tabs, AppBar, Typography, Hidden, Avatar } from '@material-ui/core';
import { useStyles } from '../../static/styles';
import logo from '../../static/images/rc-logo.png';
import { useStore, AppState } from '../../utils/store';
import { SortMethods, QueryParams } from '../../types/filterTypes';
import { FaHome, FaUser } from 'react-icons/fa';
import { useMediaQuery } from '@material-ui/core';
import AddFormModal from '../Project/form/AddFormModal';

interface NavProps {
    allProjects: boolean;
    setParams: React.Dispatch<React.SetStateAction<QueryParams>>;
    setAllProjects: React.Dispatch<React.SetStateAction<boolean>>;
}
const Nav = ({ allProjects, setAllProjects, setParams }: NavProps): JSX.Element => {
    const setOwnerFilter = useStore((state: AppState) => state.setOwnerFilter);
    const setTagFilter = useStore((state: AppState) => state.setTagFilter);

    const isSmallScreen = useMediaQuery('(max-width: 650px)');
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="fixed">
            <div className={classes.appBarLeft}>
                <Avatar variant="square" alt="logo" src={logo}></Avatar>
                <Hidden xsDown>
                    <Typography component="h1" variant="h6">
                        RC Projects
                    </Typography>
                </Hidden>
            </div>
            <div className={classes.appBarRight}>
                <AddFormModal />
                <Tabs value={allProjects ? 0 : 1} classes={{ indicator: classes.tallIndicator }}>
                    <Tab
                        label={!isSmallScreen && 'All Projects'}
                        icon={isSmallScreen ? <FaHome /> : ''}
                        onClick={() => {
                            setAllProjects(true);
                            setParams({ status: true, sort: SortMethods['Last Updated'] });
                            setOwnerFilter(undefined);
                            setTagFilter(undefined);
                        }}
                        data-testid="All Projects"
                    />
                    <Tab
                        label={!isSmallScreen && 'My Projects'}
                        icon={isSmallScreen ? <FaUser /> : ''}
                        onClick={() => {
                            setAllProjects(false);
                            setParams({ me: true, sort: SortMethods['Last Updated'] });
                        }}
                        data-testid="My Projects"
                    />
                </Tabs>
            </div>
        </AppBar>
    );
};

export default Nav;
