const multer = require('multer')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.params
        const dir = path.join(process.cwd(), 'uploads', 'recipes', String(id))
        fs.mkdirSync(dir, { recursive: true })
        cb(null, dir)
    },
    filename: (_req, file, cb) => {
        const ext = mime.extension(file.mimetype) || 'bin'
        cb(null, `image-${Date.now()}.${ext}`)
    }
})
const fileFilter = (_req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)/.test(file.mimetype)
    cb(ok ? null : new Error('סוג קובץ לא נתמך'), ok)
}

const uploadImage = multer( {
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})

module.exports = uploadImage