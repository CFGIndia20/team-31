  var MongoClient = require('mongodb').MongoClient;
  var url = "";
  var queue;
  var id;
  var j;
  var s;
  var batch_item;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    dbo.collection("teachersqueue").findOne({}, function(err, result) {
      if (err) throw err;
      
      queue = result.val;         //Initializtion pending
      id = result._id;
    });
     

      //s is the slot id which is in batch collection
      dbo.collection("batch").findOne({teacher_id:null},function(err,result){
        batch_item=result;
        s=batch_item.slot_id;
        batch_item_id=batch_item.id;
      });
      

      for (i = 0, len = queue.length; i < len; i++) {
       var id=queue[i];
       var obj;
       dbo.collection("teacher").findOne({_id:id},function(err,result){
        if (err) throw err;
          var obj=result;
       });
       if(queue.slot[i]==0)
        {
          if((queue.slot[s-1])==0&&(queue.slot[s+1])==0)||((if(s==0)&&(if(obj.slot[s+1]]==0)))||(if(s==end)&&if(obj.slot[s-1]))
          {
      
              if(queue.tslot<4)
              {
                //update slot[s] as 1 in teacher[i]
                //increment tSlot by 1
                //insert teachers id to the batch
       
              var myquery = { id:queue[i]};
              var newvalues = { $set: {slot.s:1 ,  $inc: { tSlot: 1 }} };
              dbo.collection("teacher").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              
              });


                var myquery = { id:batch_item_id};
              var newvalues = { $set: {teacher_id:id} };
              dbo.collection("batch").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
               
               });
       }
      
      }
      
      
    }
  }
  dbo.close();
});
     




