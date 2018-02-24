


 exports.middleware=function(req,res,next)
 {
	
	
	 org=req.originalUrl;
	
		  publicv = ['images', 'javascripts', 'stylesheets', 'favicon.ico'];
	 perm=['admin/login/','admin/loginv/','/admin/login','/admin/loginv','/jquery/jquery-2.1.1.min.js','/bootstrap/js/bootstrap.min.js',
	 '/font-awesome/css/font-awesome.min.css',
	 '/bootstrap/css/bootstrap.min.css',
	 '.css',
	 '.js',
	 '.eot',
	 '.woff',
	 '.woff2',
	 '.ttf',
	 '.otf',
	 '.svg',
	 '.gif','.png','.jpeg','.jpg'
	 ];
	 perm2=["admin/login",'admin/loginv',"/permissiond/",'/permissiond','/logout'];
	
	   if(!req.session.token)
	   {
		   
		  if(perm2.indexOf(org) >=0)
		  {
			  
			next();  
		  
		  }
		  else{
			  
// check rights etc
			
			 
			  
			  if(!req.session.lasturl)
			  {
				 // console.log(org);
				 temp=org.toLowerCase();
				 if(temp.search(/(\.jpg|\.jpeg|\.gif|\.css|\.js|\.woff|\.eot|\.png|\.ttf|\.svg|\.otf)/)==-1)
				 {
					req.session.lasturl=org; 
					 
				 }
				
			  
			  }
			 

		 res.redirect('/admin/login'); 
		 
			 
			 next();  
		  }
		   
	   }
	   else{

				  if(!checkRoute(org,req))
				  {
					  
					  console.log("permission denied");
					  res.redirect("/permissiond/");
					  
				  }
				 else{
				 
	 
		
		
		
		     if(req.session.lasturl)
			 {
				 t=req.session.lasturl;
				 req.session.lasturl=null;
				 res.redirect(t);
			 } 
			 
			 else
			 {
				 next();
				 
			 }
			 
			 }
	   }
	
 }


 function modifyurl(url)
 {
	 
	leng=url.length;
	pre=post='/';
	 if(url.slice(0,1)=='/')
		 pre='';
	 if(url.slice(leng-1,leng)=='/')
		 post='';
	 url=pre+url+post;
	 //console.log(url);
	 return url;
	 
 }
 function paramroutes(us,url)
 {
	 
	 if(us.length<1)
		 return url;
	 for(i=0;i<us.length;i++)
	 {
		 if(url.search(us[i])>-1)
			 return us[i];
		 
		 
	 }
	 return url;
	 
 }
function checkRoute(url,req)
{
	rts=require('../../rts');
	urls=rts.get();
	purls=rts.getp();
	//console.log(rts.get());
	console.log("modifying url");
	
	url=modifyurl(url);
	url=paramroutes(purls,url);
	console.log(url);
	 if(urls.indexOf(url)==-1)
		 return 1;
	console.log(req.session);
	
if(req.session.arights)
{
arights=req.session.arights;

	  if(arights.indexOf(url)>=0 )
	  {
		 
return 1;		 
		  
	  }
	  else
	  {
		  
		return 0;  
		  
	  }
	
	
}
	
	
}
 exports.mcheck=function(route,req)
 {
	 if(!req.session.mrights)
{
	return 0; 
} 
 if(req.session.mrights.indexOf(route)>-1)
	 return 1;
 else
	 return 0;
	 
 }


 