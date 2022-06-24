import '../WebSite/Slick.js'

let GetDataLists = await import('../Class/GetDataList.js?v='+Date.now());



const GetDataList=GetDataLists.GetDataList;

const BtnLoadProduct=document.getElementById("BtnLoadProduct");
const BtnLoadProductP=document.getElementById("BtnLoadProductP");
const BtnLoadPrize=document.getElementById("BtnLoadPrize");
const BtnLoadPrizeP=document.getElementById("BtnLoadPrizeP");
const BtnLoadCoupon=document.getElementById("BtnLoadCoupon");
const BtnLoadCouponP=document.getElementById("BtnLoadCouponP");

let param={admin_confirm: "1",trash: "0"}
const GetD=new GetDataList("userBusinessAction/GetFollowProduct",param,"resultProducts","ProductDetail","title_slug",
data=>{GetD.ShowDataProduct(data)},"BtnLoadProduct");



if(BtnLoadProduct !==null)
BtnLoadProduct.onclick=()=>{GetD.getData()}
GetD.getData();
////share product
const GetShareProduct=new GetDataList("userBusinessAction/GetFollowShareProduct",param,"resultProductsP","ProductDetail","title_slug",
data=>{GetShareProduct.ShowDataProduct(data)},"BtnLoadProductP");
GetShareProduct.getData();
if(BtnLoadProductP !==null)
BtnLoadProductP.onclick=()=>{GetShareProduct.getData()}

////business prize

const GetPrize=new GetDataList("userBusinessAction/GetFollowPrize",param,"resultPrize","PrizeDetail","id",
data=>{GetPrize.ShowDataPrize(data)},"BtnLoadPrize");
GetPrize.getData();
if(BtnLoadPrize !==null)
BtnLoadPrize.onclick=()=>{GetPrize.getData()}

//// share Prize
const GetPrizeShare=new GetDataList("userBusinessAction/GetFollowSharePrize",param,"resultPrizeP","PrizeDetail","id",
data=>{GetPrizeShare.ShowDataPrize(data)},"BtnLoadPrizeP");
GetPrizeShare.getData();
if(BtnLoadPrizeP !==null)
BtnLoadPrizeP.onclick=()=>{GetPrizeShare.getData()}

////Business coupon 

const GetCoupon=new GetDataList("userBusinessAction/GetFollowCoupon",param,"resultCoupon","couponDetail","id",
data=>{GetCoupon.ShowDataCoupon(data)},"BtnLoadCoupon");
GetCoupon.getData();
if(BtnLoadCoupon !==null)
BtnLoadCoupon.onclick=()=>{GetCoupon.getData()}

////share coupon 

const GetShareCoupon=new GetDataList("userBusinessAction/GetFollowShareCoupon",param,"resultCouponP","couponDetail","id",
data=>{GetShareCoupon.ShowDataCoupon(data)},"BtnLoadCouponP");
GetShareCoupon.getData();
if(BtnLoadCouponP !==null)
BtnLoadCouponP.onclick=()=>{GetShareCoupon.getData()}
