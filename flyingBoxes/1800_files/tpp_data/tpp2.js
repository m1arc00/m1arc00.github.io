
var TPV='2';function ANTPP()
{var v=ANRC('TID');if((v!=null)&&(v!='tacodaamoptout')&&ANTPND())
{var t=ANRC('TData');ANACP(v,t);ANATP(v,t);}}
function ANACP(v,t)
{var u='<IMG'+' SRC="http://leadback.advertising.com/adcedge/lb?site=695501&betr=tc=';if(t==null)
{u+='1&guidm=1:'+v;}
else
{var s=ANCSS(t);if(s=='')
{s='0';}
else
{s='1,'+s;}
u+=s+'&guidm=1:'+v;}
document.write(u+'&bnum='+Math.floor(Math.random()*100000)
+'" STYLE="display: none" height="1" width="1" border="0">');}
function ANATP(v,t)
{var s='';if(t!=null)
{s=ANCSS(t);}
document.write('<iframe SRC="http://cdn.at.atwola.com/_media/uac/anatp.html?t='
+v+'&s='+s+'&b='+Math.floor(Math.random()*100000)
+'" height="0" width="0" frameborder="0"></iframe>');}
function ANCSS(t)
{var a=t.split("|");var i;var s;for(i=0;i<a.length;i++)
{if(a[i].length==5)
{if(s==null)
{s=a[i];}
else
{s+=','+a[i];}}}
if(s==null)
{return'';}
return s;}
function ANTPND()
{var n=ANRC('N');if(n!=null)
{var d=n.split(":");if(d.length>1)
{var a=d[1].split(",");if((a.length<2)||(a[0]!=a[1]))
{return true;}}}
return false;}
function ANRC(n)
{var m=n+"=";var c=document.cookie;if(c.length>0)
{for(var b=c.indexOf(m);b!=-1;b=c.indexOf(m,b))
{if((b!=0)&&(c.charAt(b-1)!=' '))
{b++;continue;}
b+=m.length;var e=c.indexOf(";",b);if(e==-1)
{e=c.length;}
return unescape(c.substring(b,e));}}
return null;}
try
{ANTPP();}
catch(e)
{try
{var s='http://anrtx.tacoda.net/e/e.js?s=tpp&v='+escape(TPV)+'&m='+escape(m);document.write('<SCR'+'IPT SRC="'+s+'" LANGUAGE="JavaScript"></SCR'+'IPT>');}
catch(e2)
{}}