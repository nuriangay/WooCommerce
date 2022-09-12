const multer = require('multer') // for uploading files
const path = require('path')
const fs = require('fs')




// used to upload logo and cover image
const getFileStorage = () => {
	return multer.diskStorage({
		destination: (req, file, cb) => {
		
			const imagePath = path.join(__dirname, '..', 'public', 'products')
			if (!fs.existsSync(imagePath)) {
				fs.mkdirSync(imagePath, { recursive: true })
			}

			cb(null, imagePath)
		},
		filename: (req, file, cb) => {
			const date = new Date().toISOString().replace(/:/g, '-')
			const name = date + '_' + encodeURI(file.originalname)
			cb(null, name)
		},
	})
}

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const clearImage = (filePath) => {
	if (filePath != null) {
		filePath = path.join(__dirname, '..', 'public', filePath)
		fs.unlink(filePath, (error) => {})
	}
}

module.exports = {
	getFileStorage,
	fileFilter,
	clearImage,
}