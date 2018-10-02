var CsvUtility=new function(){  
  //---------------------------------------------------------
  /**
  * upload CSV Data  to  FIREBASE function     
  * @param  {string} auth token     
  * @param  {string} user uid on firebase
  * @param  {ARRAY} csvData
  * @return  {OBJECT} ElaborationResult
  */
  //---------------------------------------------------------
  this.elaborateData=function(userToken, values) {
    
    //retrive config
    var batchCSVMappingNode= 'config/batchConfig/amisEthanolCapacityMarketMonitorIndicators/CSVMappingOrderFields';
    var batchCSVMapping = FirebaseConnector.getFireBaseDataParsed(batchCSVMappingNode, userToken);    
    
    //the saving node
    var dataNode= 'dataAmisEthanolCapacityMarketMonitorIndicators';
    
    var lenght = values.length;    
    
    //inizialize the json array
    var jsonArray = [];
  
    var elaborationResult= CsvValidator.validate(values,batchCSVMapping);
    
    //if the CSV is valid, proced with elaboration
    if(elaborationResult.result){
      
      //loop the CSV elements
      for(var i=1; i<lenght;i++){
        //jsonRow
        var jsonRow={};      
        
        jsonRow.Date=values[i][batchCSVMapping.Date];
        jsonRow.Indicator_Category=values[i][batchCSVMapping.Indicator_Category];
        jsonRow.Indicator_Category_Code=values[i][batchCSVMapping.Indicator_Category_Code];
        jsonRow.Indicator_Name=values[i][batchCSVMapping.Indicator_Name];
        jsonRow.Indicator_Code=values[i][batchCSVMapping.Indicator_Code];
        jsonRow.Source=values[i][batchCSVMapping.Source];
        jsonRow.Value=values[i][batchCSVMapping.Value];
        jsonRow.Measurement_Unit=values[i][batchCSVMapping.Measurement_Unit];
        
        jsonArray.push(jsonRow);
        //break;
      }    
      
      //Logger.log(jsonArray);
      
      //save data in FIREBASE
      FirebaseConnector.writeOnFirebase(jsonArray,dataNode,userToken);
    }
    
    return elaborationResult;
  }
  //---------------------------------------------------------
  // END Fetch Sheet Data from FIREBASE function
  //--------------------------------------------------------- 
}
