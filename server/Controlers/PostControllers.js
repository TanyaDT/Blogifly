const Post = require("../models/Post");

exports.createPost= async (request, res) => {
    try {
        const newPost = await Post.create(request.body)
        return res.json(newPost)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

exports.deletePost= async(request,res) => {
        try {
            const{postId}= request.params 
            await Post.findByIdAndDelete(postId).exec()
            res.sendStatus(200) 
            
        } catch (error) {
            return res.status(500).send(error)
        }
} 

exports.editPost= async(request,res) => {
try {
    const{postId}= request.params 
    const modifiedPost = await Post.findByIdAndUpdate(postId, request.body, {returnDocument:'after'}).populate("owner").exec() 
    return res.json(modifiedPost)

} catch (error) {
    return res.status(500).send(error) 
}

}

exports.listPosts= async(request,res) => {
    //const owner = request.query.owner
    try {
        //const posts = await Post.find({owner}).populate("owner").sort({updatedAt: "desc"}).exec()
        const posts = await Post.find().populate("owner").sort({updatedAt: "desc"}).limit(5)
        return res.json(posts)
    } catch (error) {
        return res.status(500).send(error)  
    }

}

exports.getPost= async(request,res) => {
    try {
        const post = await Post.findById(request.params.postId).exec()
        return res.json(post)

        // const posts = await Post.find().limit(10).populate(
        // //     {path: 'owner',
        // // select:'username age address image'})
        // // res.send(posts)

    } catch (error) {
        return res.status(500).send(error)  
    }
}

exports.addComment=async(request, res) => {
    try {
        const post=await Post.findById(request.params.postId).exec() 
        post.comments.push(request.body)
        console.log(request.body); 

        await post.save() 
        return res.json(post) 

    } catch (error) {
        console.log(error);
         return res.status(500).send(error) 
    }

}

exports.deleteComment= async(request, res) => {
    try {
        console.log("in delete Comment")
            const{commentId, postId}= request.params 
            await Post.findByIdAndUpdate(postId, {$pullAll:{comments:[commentId]}})
            res.sendStatus(200) 
            
        } catch (error) {
            return res.status(500).send(error)
        }
}

exports.editComment=async(request,res) => {
    try {
        const{commentId}= request.params 
        const modifiedComment = await Post.findByIdAndUpdate(commentId, request.body, {returnDocument:'after'}).exec() 
        return res.json(modifiedComment)
    
    } catch (error) {
        return res.status(500).send(error) 
    }
}

