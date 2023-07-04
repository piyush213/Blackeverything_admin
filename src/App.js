import "./App.css";
import React, { components } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import config from './config/config.js'
import config from "./coreFIles/config";
import Login from "./component/login";
import Dashboard from "./component/dashboard";
import Phase from "./component/phase";
import Users from "./component/users";
import UserReferrals from "./component/userReferrals";
import Withdrawal from "./component/withdrawal";
import Systemsetting from "./component/systemsetting";
import Stakingsetting from "./component/stakingsetting";
import Dynamicsellprice from "./component/dynamicsellprice";
import Sellhistory from "./component/sellhistory";
import Stakinghistory from "./component/stakinghistory";
import Subscribers from "./component/subscribers";
import Burning from "./component/burning";
import Changepassword from "./component/changepassword";
import Blog from "./component/blog";
import Blogslider from "./component/blogslider";
import Blogupdate from "./component/blogupdate";
import Addblog from "./component/Addblog";
import Userdetails from "./component/userdetails";
import Blogsliderupdate from "./component/updateblogslider";
import Achiever from "./component/Achiever";
import Addachiever from "./component/addachiever";
import Updateachiever from "./component/updateachiever";
import Gallary from "./component/gallary";
import Addgallary from "./component/addgallary";
import Updategallary from "./component/updategallary";
import Latestreleases from "./component/latestreleases";
import Addlatestrealeses from "./component/addlatestrealeses";
import LatestRealesesupdate from "./component/updatelatestrealeses";
import Tradersguide from "./component/tradersguide";
import Articleupdate from "./component/updatearticle";
import Addarticle from "./component/addarticle";
import Category from "./component/category";
import Addcategory from "./component/addcategory";
import Categoryupdate from "./component/updatecategory";
import Articlecategory from "./component/articlecategory";
import Addarticlecategory from "./component/addarticlecategory";
import Articlecategoryupdate from "./component/updaatearticlecategory";
import Vedios from "./component/vedio";
import Addvedios from "./component/addvedios";
import Updatevedios from "./component/updatevedios";
import Faq from "./component/Faq";
import AddFaq from "./component/AddFaq";
import AboutUs from "./component/AboutUs";
import Tou from "./component/Tou";
import Privacypolicy from "./component/PrivacyPolicy";
import Cookiepolicy from "./component/CookiePolicy";
import BankDetails from "./component/BankDetails";
import Contactus from "./component/ContactUs";
import BuyTransactions from "./component/BuyTransactions";
import KycDetails from "./component/KycDetails";
import UserBankDetails from "./component/UserBankDetails";
import KycUserDetails from "./component/KycUserDetails";
import DepositInrContent from "./component/DepositInrContent";
import ReferralContent from "./component/ReferralContent";
import KycContent from "./component/KycContent";      
import Announcements from "./component/Announcements";
import AddAnnouncement from "./component/AddAnnouncement";
import SupportManagement from "./component/SupportManagement";
import DepositInr from "./component/DepositInr";
import OrderTableManagement from "./component/OrderTableManagement";
import Chats from "./component/Chats";
import Chatss from "./component/Chatss";
import PairList from "./component/PairList";
import WalletManagement from "./component/WalletManagement";
import ReportManagement from "./component/ReportManagement";



function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={`${config.baseUrl}`} element={<Login />} />
          <Route path={`${config.baseUrl}dashboard`} element={<Dashboard />} />
          <Route path={`${config.baseUrl}phase`} element={<Phase />} />
          <Route path={`${config.baseUrl}users`} element={<Users />} />
          <Route
            path={`${config.baseUrl}userReferrals/:user_id`}
            element={<UserReferrals />}
          />
          <Route
            path={`${config.baseUrl}withdrawal`}
            element={<Withdrawal />}
          />
          <Route
            path={`${config.baseUrl}systemsetting`}
            element={<Systemsetting />}
          />
          <Route
            path={`${config.baseUrl}stakingsetting`}
            element={<Stakingsetting />}
          />
          <Route
            path={`${config.baseUrl}dynamicsellprice`}
            element={<Dynamicsellprice />}
          />
          <Route
            path={`${config.baseUrl}sellhistory`}
            element={<Sellhistory />}
          />
          <Route
            path={`${config.baseUrl}stakinghistory`}
            element={<Stakinghistory />}
          />
          <Route
            path={`${config.baseUrl}subscribers`}
            element={<Subscribers />}
          />
          <Route path={`${config.baseUrl}burning`} element={<Burning />} />
          <Route
            path={`${config.baseUrl}changepassword`}
            element={<Changepassword />}
          />
          <Route path={`${config.baseUrl}Blog`} element={<Blog />} />
          <Route
            path={`${config.baseUrl}blogupdate/:id`}
            element={<Blogupdate />}
          />
          <Route path={`${config.baseUrl}addblog`} element={<Addblog />} />
          <Route
            path={`${config.baseUrl}userdetails/:id`}
            element={<Userdetails />}
          />
          <Route
            path={`${config.baseUrl}Blogslider`}
            element={<Blogslider />}
          />
          <Route
            path={`${config.baseUrl}updateblogslider/:id`}
            element={<Blogsliderupdate />}
          />
          <Route path={`${config.baseUrl}Achiever`} element={<Achiever />} />
          <Route
            path={`${config.baseUrl}Addachiever`}
            element={<Addachiever />}
          />
          <Route
            path={`${config.baseUrl}Updateachiever/:id`}
            element={<Updateachiever />}
          />
          <Route path={`${config.baseUrl}Gallary`} element={<Gallary />} />
          <Route
            path={`${config.baseUrl}Addgallary`}
            element={<Addgallary />}
          />
          <Route
            path={`${config.baseUrl}Updategallary/:id`}
            element={<Updategallary />}
          />
          <Route
            path={`${config.baseUrl}Latestreleases`}
            element={<Latestreleases />}
          />
          <Route
            path={`${config.baseUrl}Tradersguide`}
            element={<Tradersguide />}
          />
          <Route
            path={`${config.baseUrl}LatestRealesesupdate/:id`}
            element={<LatestRealesesupdate />}
          />
          <Route
            path={`${config.baseUrl}Addlatestrealeses`}
            element={<Addlatestrealeses />}
          />
          <Route
            path={`${config.baseUrl}Articleupdate/:id`}
            element={<Articleupdate />}
          />
          <Route
            path={`${config.baseUrl}Addarticle`}
            element={<Addarticle />}
          />
          <Route path={`${config.baseUrl}Category`} element={<Category />} />
          <Route
            path={`${config.baseUrl}Addcategory`}
            element={<Addcategory />}
          />
          <Route
            path={`${config.baseUrl}Categoryupdate/:id`}
            element={<Categoryupdate />}
          />

          <Route
            path={`${config.baseUrl}Articlecategory`}
            element={<Articlecategory />}
          />
          <Route
            path={`${config.baseUrl}Addarticlecategory`}
            element={<Addarticlecategory />}
          />
          <Route path={`${config.baseUrl}Articlecategoryupdate/:id`} element={<Articlecategoryupdate />}
          />
          <Route path={`${config.baseUrl}Vedios`} element={<Vedios />}
          />
          <Route path={`${config.baseUrl}Addvedios`} element={<Addvedios />}
          />
          <Route
            path={`${config.baseUrl}Updatevedios/:id`} element={<Updatevedios />}
          />
          {/* -------------------------------------------------------- */}
          <Route path={`${config.baseUrl}faqs`} element={<Faq />}
          />
          <Route path={`${config.baseUrl}addfaqs`} element={<AddFaq />}
          />
          <Route path={`${config.baseUrl}aboutus`} element={<AboutUs />}
          />
          <Route path={`${config.baseUrl}tou`} element={<Tou />}
          />
          <Route path={`${config.baseUrl}privacypolicy`} element={<Privacypolicy />}
          />
          <Route path={`${config.baseUrl}cookiepolicy`} element={<Cookiepolicy />}
          />
          <Route path={`${config.baseUrl}bankdetails`} element={<BankDetails />}
          />
          <Route path={`${config.baseUrl}contactus`} element={<Contactus />}
          />
          <Route path={`${config.baseUrl}buytransactions`} element={<BuyTransactions />}
          />
          <Route path={`${config.baseUrl}kycdetails`} element={<KycDetails />}
          />
          <Route path={`${config.baseUrl}userbankdetails`} element={<UserBankDetails />}
          />
          <Route path={`${config.baseUrl}kycuserdetails/:id`} element={<KycUserDetails />}
          />
          <Route path={`${config.baseUrl}depositinrcontent`} element={<DepositInrContent />}
          />
          <Route path={`${config.baseUrl}referralcontent`} element={<ReferralContent />}
          />
          <Route path={`${config.baseUrl}kyccontent`} element={<KycContent />}
          />
          <Route path={`${config.baseUrl}announcements`} element={<Announcements />}
          />
          <Route path={`${config.baseUrl}addannouncement`} element={<AddAnnouncement />}
          />
          <Route path={`${config.baseUrl}supportmanagement`} element={<SupportManagement />}
          />
          <Route path={`${config.baseUrl}depositInr`} element={<DepositInr />}
          />
          <Route path={`${config.baseUrl}ordertablemanagement`} element={<OrderTableManagement />}
          />
          <Route path={`${config.baseUrl}chat/:ticket_id/:user_id`}  element={<Chatss /> }/>
          <Route path={`${config.baseUrl}pairlist`} element={<PairList />}
          />
          <Route path={`${config.baseUrl}walletmanagement`} element={<WalletManagement />}
          />
          <Route path={`${config.baseUrl}reportmanagement`} element={<ReportManagement />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
