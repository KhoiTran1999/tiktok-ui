import React from 'react';
import Content from '../../components/Content/Content';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

const DefaultLayout = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <Content />
        </div>
    );
};

export default DefaultLayout;
