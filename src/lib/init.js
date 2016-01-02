var nb = require('./nb.js');

module.exports.predictor = function (para) {	
	var dev=0;
	var num_attr=0;
	var short='';	
	nb.load_data(2);//Send the number of discrete classes   
	short=para.substring(0, 3);	
	if (short==='N.p'|| short==='Plu')
	{			
		para='Plugin_Access';		
	}
	else if (short==='N.m'|| short==='Mim' ) 
	{	
		para='MimeType_Access';		
	}
	num_attr=nb.translate_feature(para);	
	nb.change_value(num_attr,1);				
    return {
		fingerp: (dev = '')				
	};	
};
//---------------------------------------------------------------------
module.exports.initializer = function (nattr, nclasses) {
	var devi=0;		
	nb.load_data(nclasses);//Send the number of discrete classes    
	nb.initialize(nattr);	
	return {
		created: (devi = '')		   	
	};	
};
//---------------------------------------------------------------------
module.exports.make_prediction = function (acum) {	
	var ans=0;
	var ret=0;	
	ans=nb.make_prediction(2,47,0.88, acum);	
	return {
		mpred: (ret = ans)				   
	
	};	
};
