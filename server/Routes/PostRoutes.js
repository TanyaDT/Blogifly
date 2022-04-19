const express = require('express')
const router = express.Router()
const postController = require('../Controlers/PostControllers')

const auth = require('../middlewares/auth')

router.post('/create', auth, postController.createPost)
router.delete('/delete/:postId', auth, postController.deletePost)
router.patch('/edit/:postId', auth,postController.editPost)
router.get('/list', postController.listPosts)
router.get('/get/:postId', auth, postController.getPost)
router.post('/addComment/:postId', auth, postController.addComment)
router.delete('/deleteComment/:postId/:commentId', auth, postController.deleteComment)
router.patch('/editComment/:postId/:commentId', auth, postController.editComment)


module.exports = router