import multer from "multer" 

const multerUpload = multer({
    limits:{
       fileSize: 1024*1024*10,
    },
})

const singleAvatar = multerUpload.single("avatar")

export {multerUpload, singleAvatar}