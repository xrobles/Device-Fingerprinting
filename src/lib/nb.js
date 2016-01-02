var myClass = require('./class.json');
var myData1 = require('./instances.json');
var myFeatures = require('./features.json');
var new_instance ={};//Classify new instance
var local_counts= {};//Features
var local_ccounts= {};//Classes
var local_odds={};//ODDS
var featuresT= {};//Features
var nattr=0;//Number of Attributes
var Klasses=0;
var prior=0;
var M=2;
var K=1;
var fact=0;
var local_classOdds=0;
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
var selfit = {  
	//#------------------------------------------------------------------------------------------
   //#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
   //#------------------------------------------------------------------------------------------	
  initialize: function (nfeatures) {	    
	    var i=0;
	 	for (i = 0; i < nfeatures; i++) {
			new_instance[i]=0;
		}
    	return ('  ');
   },
    //#------------------------------------------------------------------------------------------
   //#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
   //#------------------------------------------------------------------------------------------
   print: function (car) {	  
		for (var t = 0; t < 47; t++) {			
			if (new_instance[t]===1)
			{
				console.log("Attribute : "+t+" : "+new_instance[t]+"  --  "+car);			
			}
		}
    	return ('  ');
   },
   //#------------------------------------------------------------------------------------------
   //#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
   //#------------------------------------------------------------------------------------------
   change_value: function (keyt, valuet) {
	  //  console.log("Change: "+keyt+" val: "+valuet);
		new_instance[keyt]=valuet;		    
    	return ('  ');
   },
	//#------------------------------------------------------------------------------------------
   //#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
   //#------------------------------------------------------------------------------------------
   translate_feature: function (attr) {	
	   	for(var myData in myFeatures) //Features
		{			
			if (myFeatures.hasOwnProperty(myData)) 
				{		
					if((myData in featuresT)===false)//Class					   
				    { 
						   	featuresT[myData] =myFeatures[myData] ;						    								
					}									
				}        				
		}
	    if((attr in featuresT)===false)
		{		
			return 100;
		}
	   else
	   {	   		
		   return featuresT[attr];
	   }
	   return ('');
	   
   },
	//#-------------------------------------------------------------------------------------------
   //#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
   //#------------------------------------------------------------------------------------------
  //#----------------------------LOAD COUNTS FROM JSON_FILE-------------------------------------#
  load_data: function(nclasses) 
	//load_data: function() 
    {
	  		for(var myData2 in myData1) //Class
			{
				if (myData1.hasOwnProperty(myData2)) 
				{
        			if((myData2 in local_counts)===false)//Class					   
				    { 
						   		local_counts[myData2] = {};						    								
					}					
					for(var myData3 in myData1[myData2]) //Attribute_id
					{
						if (myData1[myData2].hasOwnProperty(myData3)) 
						{
							if((myData3 in local_counts[myData2])===false)						   
						    { 
						   		local_counts[myData2][myData3] = {};//Attribute_id								
							    nattr=nattr+1;							    
						    }
							for(var myData4 in myData1[myData2][myData3]) //Attribute_id
							{
									if (myData1[myData2][myData3].hasOwnProperty(myData4)) 
									{											
											if((myData4 in local_counts[myData2][myData3])===false)						   
						   					{ 
						   						local_counts[myData2][myData3][myData4] = {};//#Attribute_type							    
						   					}
											local_counts[myData2][myData3][myData4]=myData1[myData2][myData3][myData4]	;					
											//console.log("count : "+myData1[myData2][myData3][myData4]);									
									}
							}																					
						}						
					}													
    			} 			  
			}			
		    nattr=47;		    
			//Class
			for(var myKey in myClass) //Class
			{
				if (myClass.hasOwnProperty(myKey)) 
				{
					local_ccounts[myKey] = myClass[myKey];					
				}
			}
		//#--------------ODDS-------------------------------------#
	  	var h=0;
	  	var j=0;
	  	for (h = 0; h < nclasses; h++) {//Class		  
		  for (j = 0; j < nattr; j++) {//Index Attribute			  			 
			   if (((local_ccounts[0]===0) && (local_ccounts[1]!==0) )||((local_ccounts[0]!==0) && (local_ccounts[1]===0)))
			  {
					Klasses=1;
			  }
			  else
			  {
					Klasses=2;
			  }
			  prior=(local_ccounts[h]+K)/(((local_ccounts[1]+local_ccounts[0])+(K*Klasses))*1.0);
			  //prior=(local_ccounts[h])/(((local_ccounts[1]+local_ccounts[0]))*1.0);
			  //console.log("prior "+prior);			 
			  if (h in local_ccounts)
			  {
			  		if(local_ccounts[h]!==0) //class
					{
										
						if ((j in local_odds)===false)
						{						   
							local_odds[j]={};    //Attribute						
						}
						
						if ((1 in local_counts[h][j])===false) //Attribute type 1
						{
							local_odds[j][h]=(0+(M*prior))/((local_ccounts[h]+M)*1.0);
							fact=local_odds[j][h];
						}
						else
						{
							local_odds[j][h]=(local_counts[h][j][1]+(M*prior))/((local_ccounts[h]+M)*1.0);						
						}
					
					}					
			  }
				  
		  }		  
	  }
	  local_classOdds=(local_ccounts[1]+K)/(((local_ccounts[1]+local_ccounts[0])+(K*Klasses))*1.0);//#;-------------------NORMAL		  
	  return (' ');
  },
    //#------------------------------------------------------------------------------------------
   //#$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
   //#------------------------------------------------------------------------------------------
     make_prediction: function(nclasses, nfeatures, thres, acum) {
	  acum=1;//#descomentar cuando esta comentado console.log
	  var prediction = 0;
	  var proba={};
	  var operation=0;
	  var h=0;
	  var j=0;
	  for (h = 0; h < nclasses; h++) {//Class
		  if (h===0){
		  	operation=1-local_classOdds;
			if (operation===0){
				operation=fact;
			}
			proba[h]=Math.log(operation);
			  
		  }
		  else{
		  	proba[h]=Math.log(local_classOdds);
		  }		  
		  for (j = 0; j < nfeatures; j++) {//Attribute		  			  
			  if  ((h in local_odds[j])===false){
			  	   local_odds[j][h]=0;
			  }
			  if (new_instance[j]==1){//Instance in 1 in attribute
				  //console.log("new instance "+ j+" ------- "+acum);
				  if (local_odds[j][h]!==0)//:#h is class
				  { 
			  		 proba[h]+=Math.log(local_odds[j][h]);
				  }
				  else
				  {
				  	proba[h]+=Math.log(local_odds[j][h]+fact);
				  }			  			  
			  }
			  else{//Instance in 0 in attribute
				  if (local_odds[j][h]!==0)//:#h is class
				  {			  		 
					 proba[h]+=Math.log(1-local_odds[j][h]);				  
				  }
				  else
				  {
				  	 proba[h]+=Math.log(1-(local_odds[j][h]+fact));  
				  }
				  /*if (local_odds[j][h]!==1){
				  	proba[h]+=Math.log(1-local_odds[j][h]);				  
				  }
				  else{
					proba[h]+=Math.log(1-fact);  
				  }*/
			  }
			  
		  }
		  
	  }
	  prediction=(Math.exp(proba[1]))/(Math.exp(proba[0])+Math.exp(proba[1]));
	 /* var aa=Math.exp(proba[1]);
	  var bb=Math.exp(proba[0]);		 		
	  console.log("----1 ->"+aa);
	  console.log("----0 ->"+bb);	  */
	  //console.log("prediction "+prediction);
	  if (prediction > thres){
				return ("Device Fingerprinting");
	  }
	  else{		  
	  			return ("NOT Device Fingerprinting");
	  }
  }
};
module.exports = selfit;



