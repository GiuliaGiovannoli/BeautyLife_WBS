import React from "react";
import { Link } from "react-router-dom"


import './comp-styles.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import RedeemIcon from '@material-ui/icons/Redeem';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Footer() {

  const year = new Date().getFullYear()
    
        return (
            <footer>
            <div className="companySection">
            <div>
            <br></br>
              <h4>Help</h4>
              <ul>
                <li>
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/customers/service/questions/answers" id="linkStyle">
                <LiveHelpIcon id="clickable" /> 
                F A Q
                </Link>
                </li>
                <li>
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/customers/service/questions/answers" id="linkStyle">
                <SpeakerNotesIcon id="clickable" />  
                Chat 
                </Link>
                </li>
                <li>
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/customers/service/questions/answers" id="linkStyle">
                <MailOutlineIcon id="clickable" /> 
                Email
                </Link> 
                </li>
              </ul>
            </div>
            <div>
            <br></br>
            <h4>Infos</h4>
              <ul>
              <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/customers/service/questions/answers" id="linkStyle">
                <li>Payment methods</li>
                <dl>
                  <CreditCardIcon id="clickable" /> 
                  <LocalAtmIcon id="clickable" />
                </dl>
                </Link>
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/customers/service/questions/answers" id="linkStyle">
                <li>Delivery Methods</li>
                <dl>
                  <HomeIcon id="clickable" /> 
                  <MarkunreadMailboxIcon id="clickable" />
                </dl>
                </Link>
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/customers/service/questions/answers" id="linkStyle">
                <li>Refound Options</li>
                <dl>
                  <RedeemIcon id="clickable" /> 
                  <AccountBalanceIcon id="clickable" />
                </dl>
                </Link>
              </ul>
            </div>
            <div>
            <br></br>
              <h4>About us</h4>
              <ul>
                <li>
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/info/story/us/three/founders" id="linkStyle">
                <LocalMoviesIcon id="clickable" />  
                Story
                </Link>
                </li>
                <li>
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/info/story/us/three/founders" id="linkStyle">
                <AlarmOnIcon id="clickable" /> 
                News
                </Link>
                </li>
                <li>
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/info/story/us/three/founders" id="linkStyle">
                <WorkOutlineIcon id="clickable" /> 
                Staff
                </Link> 
                </li>
                <li>
                  <a style={{ color: '#2b4f60', textDecoration: 'none' }} target="blank" href="https://github.com/GiuliaGiovannoli/BeautyLife_WBS"><GitHubIcon id="clickable" /> Code </a>
                </li>
              </ul>
            </div>
            </div>
                <div id="socials">
                        <GitHubIcon id="clickable" />
                        <YouTubeIcon id="clickable" />
                        <TwitterIcon id="clickable" />
                        <FacebookIcon id="clickable" />
                        <InstagramIcon id="clickable" />
                        <LinkedInIcon id="clickable" />
                </div>
                <hr></hr>
                <div className="infos">
                <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/info/story/us/three/founders" id="linkStyle">
                  <p id="clickable">Location</p>
                  </Link>
                  <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/customers/service/questions/answers" id="linkStyle">
                  <p id="clickable">Terms & Conditions</p>
                  </Link>
                  <Link to="/BeautyLife_WBS/beauty/life/company/help/contact/customers/service/questions/answers" id="linkStyle">
                  <p id="clickable">Privacy Notice</p>
                  </Link>
                </div>
                <hr></hr>
                <div className="infos">
                  <p>Copyright &copy; {year} BeautyLife. All Rights Reserved</p>
                </div>
            </footer>
        );
}
