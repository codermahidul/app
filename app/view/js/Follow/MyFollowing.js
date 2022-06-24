let FollowC=await import("./FollowClass.js?v="+Date.now());

const FollowClass=FollowC.FollowClass;

const FollowCl=new FollowClass("result",()=>{FollowCl.GetMyFollowing()});

FollowCl.GetMyFollowing()