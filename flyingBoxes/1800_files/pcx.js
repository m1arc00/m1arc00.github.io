/*
 * Build version Vermont-12.0.0-122
 */

rsinetsegs = ['H07707_10015','H07707_10017','H07707_10018','H07707_10019','H07707_10024','H07707_10025','H07707_10056','H07707_10083','H07707_10084','H07707_10086','H07707_10089','H07707_10105','H07707_10136','H07707_10158','H07707_10193','H07707_10194','H07707_10195','H07707_10196','H07707_10197','H07707_10198','H07707_10199','H07707_10200','H07707_10207','H07707_10216','H07707_50002','H07707_50027','H07707_50000','H07707_50028','H07707_50037','H07707_50047','H07707_50048','H07707_50057','H07707_50060','H07707_50061','H07707_50079','H07707_50082','H07707_50100','H07707_50111','H07707_50119','H07707_50139','H07707_10190','H07707_50162','H07707_50178','H07707_50185','H07707_50187','H07707_50204','H07707_50210'];
var rsi_exp=new Date(rsi_now.getTime()+2419200000);
var rsi_dom=location.hostname;
rsi_dom=rsi_dom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/,'$1');
rsi_dom=rsi_dom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/,'$1');
rsi_dom=rsi_dom.replace(/.*(\.[\w\-]{3,}\.[a-zA-Z]{2}$)/,'$1');
document.cookie=('rsi_segs='+rsinetsegs.join('|')+';expires='+rsi_exp.toGMTString()+';path=/;domain='+rsi_dom);
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(rsinetsegs,'H07707');}
  