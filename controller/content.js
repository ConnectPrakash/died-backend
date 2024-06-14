
const Content = require("../model/content");

exports.createPost = async(request,response) =>{
            //get the user id from the request
            try {
              const userid = request.userId;
                //create register

                const {age,height,weight} = request.body;
            
                const post = new Content({
                    age,
                    height,
                    weight,
                    user:userid
               
                    
                })

                await post.save();

                return response.json({message:
                    'Post created successfully',post
                });


            } catch (error) {
                return response.json({error:"Token is invallid"})
            }
          }
exports.allPosts = async(request,response) =>{

    try{
        const userId = request.userId;
        const posts = await Content.find({user:userId});

        return response.json({message:'All posts',posts});
    }catch(error){
        return response.json({error:'Token is invalid'});
    }
}