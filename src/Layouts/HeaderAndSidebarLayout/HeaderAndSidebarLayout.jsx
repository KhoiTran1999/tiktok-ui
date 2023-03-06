import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Profile from '../../pages/Profile';

const HeaderAndSidebarLayout = () => {
    return (
        <div>
            <h1>HeaderAndSidebarLayout</h1>
            <Header />
            <Sidebar />
            <Profile />
        </div>
    );
};

export default HeaderAndSidebarLayout;
