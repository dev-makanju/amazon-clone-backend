  const aws = require("aws-sdk")
  const multer = require("multer")
  const multerS3 = require("multer-s3")

  aws.config.update({
      secretAccessKey: process.env.AWSSecretKey,
      accessKeyId:process.env.AWSAccessKeyId
  });

  //initialise a new s3 object
  const s3 = new aws.S3();

  //now we create and upload images
  //bucket name is africana-v1

  const upload = multer({
    storage:multerS3({
        s3: s3,
        bucket: "africana-v1",
        ACL:"public-read", //for reading publicly or privately
        metadata:(req , file , cb) => {
            cb(null , { 
                fieldName: file.fieldname  
            });
        },
        key:(req , file , cb) => {
            cb( null , Date.now().toString());
        }
    })
  })

module.exports = upload ; 
