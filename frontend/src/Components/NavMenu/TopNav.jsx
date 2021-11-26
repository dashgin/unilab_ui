import React, { useState, useEffect, useReducer } from "react";
// STYLES
import "./TopNav.css";
// IMAGES
import logo from "../../Assets/img/unilab_logo.png";
import home_icon from "../../Assets/img/top-nav/address2.png";
import community_icon from "../../Assets/img/top-nav/community.png";
import companies_icon from "../../Assets/img/top-nav/employers.png";
import jobs_icon from "../../Assets/img/top-nav/jobs.svg";
import about_icon from "../../Assets/img/top-nav/about.png";
import profile_icon from "../../Assets/img/top-nav/profile.png";
import search_icon from "../../Assets/img/top-nav/search.png";

import english_icon from "../../Assets/img/languages/en.webp";
import spanish_icon from "../../Assets/img/languages/es.webp";
import german_icon from "../../Assets/img/languages/de.webp";
import russian_icon from "../../Assets/img/languages/ru.webp";
import french_icon from "../../Assets/img/languages/fr.webp";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../../Context";

function TopNav(props) {
    const height = document.documentElement.clientHeight;
    const width = document.documentElement.clientWidth;

    const state = useAuthState()
    const userData = state.userData;

    const setProfileClasses = props.setProfileClasses;
    const setLanguageClasses = props.setLanguageClasses;
    const setSearchClasses = props.setSearchClasses;

    // OPEN AND CLOSE MOBILE MENU
    function changeMobileClasses(initState) {
        if (initState[0] === "linebar-inactive") {
            return ["linebar-toggled", "container-opened"];
        }
        else {
            return ["linebar-inactive", "container-closed"];
        }
    }
    const initMobileClasses = ["linebar-inactive", "container-closed"];
    const [mobileClasses, setMobileClasses] = useReducer(changeMobileClasses, initMobileClasses);
    const [linebarClass, containerClass] = mobileClasses;

    return (
        <nav className={`top-nav flex-row a-i-c shadow`}>

            {/*LOGO*/}
            <NavLink to='/' id="logo-link" className={`top-nav-item flex-row a-i-c`}>
                <img id="logo-img" className={`top-nav-image`} src={logo} alt="UniLab Logo" title="Home" />
            </NavLink>

            {/*MOBILE*/}
            <div className={`linebar-btn ${linebarClass}`} onClick={setMobileClasses} />

            {/*MENU*/}
            <div className={`top-nav-container ${containerClass}`}>

                {/*HOME BUTTON*/}
                <NavLink to="/" className={`top-nav-item flex-row a-i-c`}>
                    <div className={`top-nav-item-filler flex-row a-i-c`} />
                    <img className={`top-nav-image`} src={home_icon} alt="Home Icon" />
                    {/*{# Translators: Start of Navigation bar #}*/}
                    <div id="home-button" className={`top-nav-item-text`}>
                        {/*{% translate "Home" context "this is the navbar"%}*/}
                        Home
                    </div>
                </NavLink>

                {/*COMMUNITY BUTTON*/}
                <NavLink to="/community" className={`top-nav-item flex-row a-i-c`}>
                    <div className={`top-nav-item-filler flex-row a-i-c`} />
                    <img className={`top-nav-image`} src={community_icon} alt="Community Icon" />
                    <div id="community-button" className={`top-nav-item-text`}>
                        {/*{% translate "Community"%}*/}
                        Community
                    </div>
                </NavLink>

                {/*COMPANIES BUTTON*/}
                <NavLink to="/companies" className={`top-nav-item flex-row a-i-c`}>
                    <div className={`top-nav-item-filler flex-row a-i-c`} />
                    <img className={`top-nav-image`} src={companies_icon} alt="Companies Icon" />
                    <div id="employers-button" className={`top-nav-item-text`}>
                        {/*{% translate "Companies"%}*/}
                        Companies
                    </div>
                </NavLink>

                {/*JOBS BUTTON*/}
                <NavLink to="/jobs" className={`top-nav-item flex-row a-i-c`}>
                    <div className={`top-nav-item-filler flex-row a-i-c`} />
                    <img className={`top-nav-image`} src={jobs_icon} alt="Jobs Icon" />
                    <div id="jobs-button" className={`top-nav-item-text`}>
                        {/*{% translate "Jobs"%}*/}
                        Jobs
                    </div>

                </NavLink>

                {/*ABOUT BUTTON*/}
                <NavLink to="/about" className={`top-nav-item flex-row a-i-c`}>
                    <div className={`top-nav-item-filler flex-row a-i-c`} />
                    <img className={`top-nav-image`} src={about_icon} alt="About Icon" />
                    <div id="about-button" className={`top-nav-item-text`}>
                        {/*{% translate "About"%}*/}
                        About
                    </div>
                </NavLink>

                {/*PROFILE BUTTON*/}
                <a className={`top-nav-item top-nav-profile flex-row a-i-c`} onClick={setProfileClasses}>
                    <img id="profile-img" className={`top-nav-image`} src={userData ? userData['image'] : profile_icon}
                        alt="Profile Picture" title="Profile" />

                    <div id="profile-text" className={`top-nav-item-text`}>
                        {/*{% translate "Profile"%}*/}
                        Profile
                    </div>
                </a>

                {/*SEARCH BUTTON*/}
                <a className={`top-nav-item top-nav-search flex-row a-i-c`} onClick={setSearchClasses}>
                    <img id="search-img" className={`top-nav-image`} src={search_icon} alt="Magnifying Glass" title="Search" />
                    <div id="search-text" className={`top-nav-item-text`}>
                        {/*{% translate "Search"%}*/}
                        Search
                    </div>
                </a>

                {/*LANGUAGE BUTTON*/}
                <a className={`top-nav-item flex-row a-i-c`} onClick={setLanguageClasses}>
                    <img id="lang-img" className={`top-nav-image`} src={english_icon} alt="Locale Flag" title="Language" />
                    {/*{# Translators: End of navigation bar #}*/}
                    <div id="search-text" className={`top-nav-item-text`}>
                        {/*{% translate "Language"%}*/}
                        Language
                    </div>
                </a>
            </div>
        </nav>
    )
}

export default TopNav;