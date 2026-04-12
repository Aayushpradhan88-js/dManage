import { Request } from "express"
import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req:Request, file:Express.Multer.File, cb:any) {
    cb(null, '../../../storage')
  },
  filename: function (req:Request, file:Express.Multer.File, cb:any) {
    cb(null, Date.now() + '-' + file.fieldname.toString)
  }
})

export {multer, storage};