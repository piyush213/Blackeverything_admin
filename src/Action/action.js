import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestFormData,
} from "../coreFIles/helper";

export const LoginAction = (data) => {
  return postRequest("adminLogin", data).then((res) => {
    return res.data;
  });
};

export const getDashboardStatisticsAction = (data) => {
  return postRequest("getDashboardStatistics", data).then((res) => {
    return res.data;
  });
};

export const getUsersListAction = (data) => {
  return postRequest("getUsersList", data).then((res) => {
    return res.data;
  });
};

export const loginAsUserAction = (data) => {
  return postRequest("loginAsUser", data).then((res) => {
    return res.data;
  });
};
export const getUsersReferralsAction = (data) => {
  return postRequest("getUsersReferrals", data).then((res) => {
    return res.data;
  });
};

export const getStackingHistoryAction = (data) => {
  return postRequest("getStackingHistory", data).then((res) => {
    return res.data;
  });
};

export const getWithdrawalStatisticsAction = (data) => {
  return postRequest("getWithdrawalStatistics", data).then((res) => {
    return res.data;
  });
};

export const getMntWithdrawalHistoryAction = (data) => {
  return postRequest("getMntWithdrawalHistory", data).then((res) => {
    return res.data;
  });
};

export const approveWithdrwalRequestAction = (data) => {
  return postRequest("approveWithdrwalRequest", data).then((res) => {
    return res.data;
  });
};

export const rejectWithdrwalRequestAction = (data) => {
  return postRequest("rejectWithdrwalRequest", data).then((res) => {
    return res.data;
  });
};

export const getTransactionHistoryAction = (data) => {
  return postRequest("getTransactionHistory", data).then((res) => {
    return res.data;
  });
};

export const getPhaseListAction = (data) => {
  return postRequest("getPhaseList", data).then((res) => {
    return res.data;
  });
};

export const updatePhaseStatusAction = (data) => {
  return postRequest("updatePhaseStatus", data).then((res) => {
    return res.data;
  });
};

export const updatePhaseAction = (data) => {
  return postRequest("updatePhase", data).then((res) => {
    return res.data;
  });
};

export const getSubscriberListAction = (data) => {
  return postRequest("getSubscriberList", data).then((res) => {
    return res.data;
  });
};

export const changePasswordAction = (data) => {
  return postRequest("changePassword", data).then((res) => {
    return res.data;
  });
};

export const getActivePhaseAction = (data) => {
  return postRequest("getActivePhaseAdmin", data).then((res) => {
    return res.data;
  });
};
export const UserBlockAction = (data) => {
  return postRequest("userblock", data).then((res) => {
    return res.data;
  });
};
export const UserUnBlockAction = (data) => {
  return postRequest("userUnblock", data).then((res) => {
    return res.data;
  });
};
export const insertblogAction = (data) => {
  return postRequestFormData("insertblog", data).then((res) => {
    return res.data;
  });
};
export const updateblogAction = (data) => {
  return postRequestFormData("updateblog", data).then((res) => {
    return res.data;
  });
};
export const deleteblogAction = (data) => {
  return postRequest("blogdelete", data).then((res) => {
    return res.data;
  });
};
export const getblogAction = (data) => {
  return postRequest("getblog", data).then((res) => {
    return res.data;
  });
};
export const getblogidAction = (data) => {
  return postRequest("getblogid", data).then((res) => {
    return res.data;
  });
};
export const getuserDetailsAction = (data) => {
  return postRequest("getuserDetails", data).then((res) => {
    return res.data;
  });
};
export const getBlogSliderAction = (data) => {
  return postRequest("getBlogSlider", data).then((res) => {
    return res.data;
  });
};
export const getblogslideridAction = (data) => {
  return postRequest("getblogsliderid", data).then((res) => {
    return res.data;
  });
};

export const updateblogsliderAction = (data) => {
  return postRequestFormData("updateBlogSlider", data).then((res) => {
    return res.data;
  });
};

export const BlogActiveAction = (data) => {
  return postRequest("activeBlog", data).then((res) => {
    return res.data;
  });
};
export const BlogDeactiveAction = (data) => {
  return postRequest("deactiveBlog", data).then((res) => {
    return res.data;
  });
};

export const AchievergetAction = (data) => {
  return postRequest("getachiever", data).then((res) => {
    return res.data;
  });
};
export const AchieverdeletetAction = (data) => {
  return postRequest("achieverdelete", data).then((res) => {
    return res.data;
  });
};
export const insertAchieverAction = (data) => {
  return postRequestFormData("inserAchiever", data).then((res) => {
    return res.data;
  });
};
export const getAchieveridAction = (data) => {
  return postRequest("getachieverid", data).then((res) => {
    return res.data;
  });
};

export const updateachieverAction = (data) => {
  return postRequestFormData("updateachieve", data).then((res) => {
    return res.data;
  });
};

export const addOrRemoveSliderAction = (data) => {
  return postRequest("addOrRemoveSlider", data).then((res) => {
    return res.data;
  });
};
export const getStacHistoryAction = (data) => {
  return postRequest("getUserStackingHistorybyid", data).then((res) => {
    return res.data;
  });
};

export const getPurchaseHistoryAction = (data) => {
  return postRequest("getPrchaseHistory", data).then((res) => {
    return res.data;
  });
};

export const getstackingEarningAction = (data) => {
  return postRequest("getstackingEarning", data).then((res) => {
    return res.data;
  });
};

export const getReferalEarningAction = (data) => {
  return postRequest("getReferalEarning", data).then((res) => {
    return res.data;
  });
};

export const getwithdrawhistoryAction = (data) => {
  return postRequest("getwithdrawhistory", data).then((res) => {
    return res.data;
  });
};

export const insertgallaryAction = (data) => {
  return postRequestFormData("insertgallary", data).then((res) => {
    return res.data;
  });
};

export const getgallaryimagesAction = (data) => {
  return postRequest("getgallary", data).then((res) => {
    return res.data;
  });
};

export const deletegallaryimagesAction = (data) => {
  return postRequest("gallaryimagesdelete", data).then((res) => {
    return res.data;
  });
};
export const getGallaryidAction = (data) => {
  return postRequest("getgallaryid", data).then((res) => {
    return res.data;
  });
};

export const updategallaryAction = (data) => {
  return postRequestFormData("updategallary", data).then((res) => {
    return res.data;
  });
};

export const insertlatestrealesesAction = (data) => {
  return postRequestFormData("inserLatestRealeses", data).then((res) => {
    return res.data;
  });
};

export const getlatestrealeseAction = (data) => {
  return postRequest("getlatestrealese", data).then((res) => {
    return res.data;
  });
};
export const deletelatestrealesesAction = (data) => {
  return postRequest("latestrealesesdelete", data).then((res) => {
    return res.data;
  });
};

export const getlatestrealesesidAction = (data) => {
  return postRequest("getlatestrealesesid", data).then((res) => {
    return res.data;
  });
};

export const updatelatestrealesesAction = (data) => {
  return postRequestFormData("updatelatestrealeses", data).then((res) => {
    return res.data;
  });
};

export const getarticleAction = (data) => {
  return postRequest("getarticlelist", data).then((res) => {
    return res.data;
  });
};

export const deletearticleAction = (data) => {
  return postRequest("articledelete", data).then((res) => {
    return res.data;
  });
};
export const insertarticleAction = (data) => {
  return postRequestFormData("inserArticle", data).then((res) => {
    return res.data;
  });
};

export const updatearticleAction = (data) => {
  return postRequestFormData("updatearticle", data).then((res) => {
    return res.data;
  });
};
export const getarticleidAction = (data) => {
  return postRequest("getarticleid", data).then((res) => {
    return res.data;
  });
};

export const insertcategoryAction = (data) => {
  return postRequest("inserCategory", data).then((res) => {
    return res.data;
  });
};

export const getcategoryAction = (data) => {
  return postRequest("getcategoryname", data).then((res) => {
    return res.data;
  });
};

export const getcategorylistAction = (data) => {
  return postRequest("getcategory", data).then((res) => {
    return res.data;
  });
};
export const deletecategoryAction = (data) => {
  return postRequest("categorydelete", data).then((res) => {
    return res.data;
  });
};
export const getcategoryidAction = (data) => {
  return postRequest("getcategoryid", data).then((res) => {
    return res.data;
  });
};
export const updatecategoryAction = (data) => {
  return postRequest("updateCategory", data).then((res) => {
    return res.data;
  });
};

export const insertarticlecategoryAction = (data) => {
  return postRequest("inserarticlecategory", data).then((res) => {
    return res.data;
  });
};

export const getarticlecategorylistAction = (data) => {
  return postRequest("getarticlecategory", data).then((res) => {
    return res.data;
  });
};
export const deletearticlecategoryAction = (data) => {
  return postRequest("articlecategorydelete", data).then((res) => {
    return res.data;
  });
};

export const getarticlecategoryidAction = (data) => {
  return postRequest("articlecategoryid", data).then((res) => {
    return res.data;
  });
};
export const updatearticlecategoryAction = (data) => {
  return postRequest("updatearticlecategory", data).then((res) => {
    return res.data;
  });
};

export const getvediosAction = (data) => {
  return postRequest("getvedios", data).then((res) => {
    return res.data;
  });
};
export const deletevedosAction = (data) => {
  return postRequest("vediosdelete", data).then((res) => {
    return res.data;
  });
};
export const insertvediosAction = (data) => {
  return postRequest("insertvediolink", data).then((res) => {
    return res.data;
  });
};

export const getvedioidAction = (data) => {
  return postRequest("getvediosbyid", data).then((res) => {
    return res.data;
  });
};
export const updatevediosAction = (data) => {
  return postRequest("updatevedios", data).then((res) => {
    return res.data;
  });
};

/*------------------------------------------------------------------------------*/

export const getfaqAction=(data)=>{
  return postRequest('getfaqs',data).then(res=>{return res.data})
}
export const insertfaqAction=(data)=>{
  return postRequest('insertfaqs',data).then(res=>{return res.data})
}
export const updatefaqAction=(data)=>{
  return postRequest('updatefaqs',data).then(res=>{return res.data})
}
export const deletefaqAction=(data)=>{
  return postRequest('deletefaqs',data).then(res=>{return res.data})
}

export const getAboutusAction=(data)=>{
  return postRequest('getaboutus',data).then(res=>{return res.data})
}
export const updateAboutusAction=(data)=>{
  return postRequest('updateaboutus',data).then(res=>{return res.data})
}

export const gettouAction=(data)=>{
  return postRequest('gettou',data).then(res=>{return res.data})
}
export const updatetouAction=(data)=>{
  return postRequest('updatetou',data).then(res=>{return res.data})
}

export const getprivacypolicyAction=(data)=>{
  return postRequest('getprivacypolicy',data).then(res=>{return res.data})
}
export const updateprivacypolicyAction=(data)=>{
  return postRequest('updateprivacypolicy',data).then(res=>{return res.data})
}

export const getcookiepolicyAction=(data)=>{
  return postRequest('getcookiepolicy',data).then(res=>{return res.data})
}
export const updatecookiepolicyAction=(data)=>{
  return postRequest('updatecookiepolicy',data).then(res=>{return res.data})
}

export const getbankdetailsAction=(data)=>{
  return postRequest('getbankdetails',data).then(res=>{return res.data})
}
export const updatebankdetailsAction=(data)=>{
  return postRequest('updatebankdetails',data).then(res=>{return res.data})
}

export const getcontactusAction=(data)=>{
  return postRequest('getcontactus',data).then(res=>{return res.data})
}

export const getgetbuyrequestAction=(data)=>{
  return postRequest('getbuyrequest',data).then(res=>{return res.data})
}

export const updateupdatebuyrequeststatusAction = (data) => {
  return postRequest("updatebuyrequest", data).then((res) => {
    return res.data;
  });
};

export const getgetadminbankdetailsAction=(data)=>{
  return postRequest('getadminbankdetails',data).then(res=>{return res.data})
}

export const getgetuserbankdetailsAction=(data)=>{
  return postRequest('getuserbankdetails',data).then(res=>{return res.data})
}

export const updateupdateuserbankdetailsAction = (data) => {
  return postRequest("updateuserbankdetails", data).then((res) => {
    return res.data;
  });
};

export const rejectuserbankdetailsAction = (data) => {
  return postRequest("rejectbuyrequest", data).then((res) => {
    return res.data;
  });
};

export const getsystemsettingAction=(data)=>{
  return postRequest('getSystemSetting',data).then(res=>{return res.data})
}

export const updatesystemsettingAction=(data)=>{
  return postRequest('updateSystemSetting',data).then(res=>{return res.data})
}

export const getkycAction=(data)=>{
  return postRequest('getkyc',data).then(res=>{return res.data})
}

export const showuserkycAction=(data)=>{
  return postRequest('showuserkyc',data).then(res=>{return res.data})
}

export const updatekycapprovalAction=(data)=>{
  return postRequest('updatekycapproval',data).then(res=>{return res.data})
}

export const rejectkycapprovalAction=(data)=>{
  return postRequest('rejectkycapproval',data).then(res=>{return res.data})
}

export const getbankdetailsusersAction=(data)=>{
  return postRequest('getbankdetailsusers',data).then(res=>{return res.data})
}

export const updateiskycAction=(data)=>{
  return postRequest('updateiskyc',data).then(res=>{return res.data})
}

export const updatewithdrawAction=(data)=>{
  return postRequest('updatewithdraw',data).then(res=>{return res.data})
}

export const disableiskycAction=(data)=>{
  return postRequest('disableiskyc',data).then(res=>{return res.data})
}

export const minwithdrawAction=(data)=>{
  return postRequest('minwithdraw',data).then(res=>{return res.data})
}

export const showiskycAction=(data)=>{
  return postRequest('showiskyc',data).then(res=>{return res.data})
}

export const getMntWalletsDetailsAction=(data)=>{
  return postRequest('getMntWalletsDetails',data).then(res=>{return res.data})
}

export const webcontentAction=(data)=>{
  return postRequest('getwebcontent',data).then(res=>{return res.data})
}

export const updatedeposit_contentAction=(data)=>{
  return postRequest('updatedeposit_content',data).then(res=>{return res.data})
}


export const updatereferral_contentAction=(data)=>{
  return postRequest('updatereferral_content',data).then(res=>{return res.data})
}

export const announcementAction=(data)=>{
  return postRequest('getannouncement',data).then(res=>{return res.data})
}

export const updatekyc_contentAction=(data)=>{
  return postRequest('updatekyc_content',data).then(res=>{return res.data})
}

export const updateannouncementAction=(data)=>{
  return postRequest('updateannouncement',data).then(res=>{return res.data})
}

export const deleteannouncementAction=(data)=>{
  return postRequest('deleteannouncement',data).then(res=>{return res.data})
}

export const activeannouncementAction=(data)=>{
  return postRequest('activeannouncement',data).then(res=>{return res.data})
}

export const inactiveannouncementAction=(data)=>{
  return postRequest('inactiveannouncement',data).then(res=>{return res.data})
}

export const insertannouncementAction=(data)=>{
  return postRequest('insertannouncement',data).then(res=>{return res.data})
}

export const allticketAction=(data)=>{
  return postRequest('getallticket',data).then(res=>{return res.data})
}

export const getchatAction=(data)=>{
  return postRequest('getchat',data).then(res=>{return res.data})
}

export const ticketrejectAction=(data)=>{
  return postRequest('ticketreject',data).then(res=>{return res.data})
}

export const ticketapproveAction=(data)=>{
  return postRequest('ticketapprove',data).then(res=>{return res.data})
}

export const depositadmininrAction = (data) => {
  return postRequest("depositadmininr", data).then((res) => {
    return res.data;
  });
};

export const approvedepositadmininrAction = (data) => {
  return postRequest("approvedepositadmininr", data).then((res) => {
    return res.data;
  });
};

export const rejectdepositadmininrAction = (data) => {
  return postRequest("rejectdepositadmininr", data).then((res) => {
    return res.data;
  });
};

export const getordersAction = (data) => {
  return postRequest("getorders", data).then((res) => {
    return res.data;
  });
};

export const admincoinlistAction = (data) => {
  return postRequest("admincoinlist", data).then((res) => {
    return res.data;
  });
};

export const transactionfilterAction = (data) => {
  return postRequest("transactionfilter", data).then((res) => {
    return res.data;
  });
};

export const orderfilterAction = (data) => {
  return postRequest("orderfilter", data).then((res) => {
    return res.data;
  });
};

export const transactiontypeAction = (data) => {
  return postRequest("transactiontype", data).then((res) => {
    return res.data;
  });
};


export const updatecoinbyidAction = (data) => {
  return postRequest("updatecoinbyid", data).then((res) => {
    return res.data;
  });
};

export const adminpairlistAction = (data) => {
  return postRequest("adminpairlist", data).then((res) => {
    return res.data;
  });
};

export const activeDeactivecoinPairsAction = (data) => {
  return postRequest("activeDeactivecoinPairs", data).then((res) => {
    return res.data;
  });
};