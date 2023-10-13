const { S3Client } = require("@aws-sdk/client-s3");

const BUCKET_REGION='us-east-1'
const ACCESS_KEY='AKIAW7WPBGBF2ESRE5GH'
const SECRET_ACCESS_KEY='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'


const s3 = new S3Client({ 
    credentials:{ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY,},
    region: BUCKET_REGION
    })

//console.log(s3)

module.exports ={
    s3
}