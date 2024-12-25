import React from 'react';
import UserProfile from './UserProfile';
import SearchHistory from './SearchHistory';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './ProfilePage.css';

function ProfilePage() {
    return (
        <div className="pageContainer">
            <Header/>

            <div className="mainContent">
                <div className="headerSection">
                    <h5 className="profiletitle">My Profile</h5>
                    <h5>History Search</h5>
                </div>
                <div className="contentSection">
                    <UserProfile/>
                    <SearchHistory/>
                </div>
                <button className="logoutButton" tabIndex="0">

                    <span>Log out</span>
                </button>
            </div>
            <Footer/>
        </div>
    );
}

export default ProfilePage;
