import path from 'path'
import crypto from 'crypto'
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
const SESConfig = {
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    accessSecretKey: process.env.AWS_SECRET_ACESS_KEY,
    region: process.env.AWS_DEFAULT_REGION
}
aws.config.update(SESConfig)
const storageTypesCandidate = {
    local: multer.diskStorage({
        destination: (request: any, file: any, cb: any) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'images', 'candidates'))
        },
        filename: (request: any, file: any, cb: any) => {
            crypto.randomBytes(16, (error, hash) => {
                if (error) {
                    cb(error)
                } else {
                    file.key = `${hash.toString('hex')}_${file.originalname}`
                    cb(null, file.key)
                }
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET_CANDIDATES || '',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (request, file, cb) => {
            crypto.randomBytes(16, (error, hash) => {
                if (error) {
                    cb(error)
                } else {
                    const filename = `${hash.toString('hex')}_${file.originalname}`
                    cb(null, filename)
                }
            })
        }
    })
}
const storageTypesVotation = {
    local: multer.diskStorage({
        destination: (request: any, file: any, cb: any) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'images', 'candidates'))
        },
        filename: (request: any, file: any, cb: any) => {
            crypto.randomBytes(16, (error, hash) => {
                if (error) {
                    cb(error)
                } else {
                    file.key = `${hash.toString('hex')}_${file.originalname}`
                    cb(null, file.key)
                }
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET_CANDIDATES || '',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (request, file, cb) => {
            crypto.randomBytes(16, (error, hash) => {
                if (error) {
                    cb(error)
                } else {
                    const filename = `${hash.toString('hex')}_${file.originalname}`
                    cb(null, filename)
                }
            })
        }
    })
}
export const environment = {
    server: {
        port: process.env.SERVER_PORT || 3000
    },
    db: { url: process.env.DB_URL || '' },
    security: {
        saltRounds: parseInt(process.env.SALT_ROUNDS || '10') || 10,
        secret: process.env.SECRET || 'vote-seguro',
        cors:
        {
            origin: 'http://localhost:4200/',
            optionsSuccessStatus: 200
        }
    },
    multerCandidate: {
        dest: path.resolve(__dirname, '..', '..', 'tmp', 'images', 'candidates'),
        storage: storageTypesCandidate[process.env.STORAGE_TYPE],
        limits: {
            fileSize: 2 * 1024 * 1024
        },
        fileFilter: (request: any, file: any, cb: any) => {
            const allowedMimes = [
                'image/jpeg',
                'image/png',
                'image/pjpeg',
                'image/jpg',
                'image/gif',
                'img/jpg',
                'img/pjpeg',
                'img/png',
                'img/gif'
            ];
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                console.log(file.mimetype)
                cb(new Error('Invalid file type'))
            }
        }
    },
    multerVotation: {
        dest: path.resolve(__dirname, '..', '..', 'tmp', 'images', 'votations'),
        storage: storageTypesVotation[process.env.STORAGE_TYPE],
        limits: {
            fileSize: 2 * 1024 * 1024
        },
        fileFilter: (request: any, file: any, cb: any) => {
            const allowedMimes = [
                'image/jpeg',
                'image/png',
                'image/pjpeg',
                'image/jpg',
                'image/gif',
                'img/jpg',
                'img/pjpeg',
                'img/png',
                'img/gif'
            ];
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                console.log(file.mimetype)
                cb(new Error('Invalid file type'))
            }
        }
    }
}