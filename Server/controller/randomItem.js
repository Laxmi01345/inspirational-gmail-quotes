const Quotes = require('../Models/Quotes')
const randomItem=async (req,res)=>{
 
        try {
            let randomId = Math.floor(Math.random() * 266) + 1; // Generate a random ID
            
    
            const item = await Quotes.findOne({ id: randomId }); // Use findOne with custom id field
            
            if (item) {
    
                
                
                return ({ quote: item.quote, author: item.author });                    //  schedule.cancelJob('m-job')
                
            } else {
                console.log("Item not found for ID:", randomId);
            }
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    

};


module.exports=randomItem