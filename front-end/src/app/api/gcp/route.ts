import { NextApiRequest, NextApiResponse } from 'next';
// import { Storage } from '@google-cloud/storage';

// const serviceAccountKeyFile: string = "./gcpBucketVideos.json";

// const storage = new Storage({
//   projectId: "annarabic",
//   keyFilename: serviceAccountKeyFile,
// });

// // Ensure the bucketName is consistent and directly use it instead of passing as a parameter
// const bucketName = "storage-video-ask";
// const bucket = storage.bucket(bucketName);

// async function uploadBlob(
//   sourceFilePath: string, // Adjusted for clarity: the path to the local file to upload
//   destinationBlobName: string
// ): Promise<string> {
//   await bucket.upload(sourceFilePath, { destination: destinationBlobName });
//   return `https://storage.googleapis.com/${bucketName}/${destinationBlobName}`;
// }

// // export const config = {
// //   api: {
// //     bodyParser: false, // Disables the default Next.js body parser since we're handling files
// //   },
// // };

export async function POST (req: NextApiRequest, res: NextApiResponse) {

  console.log(req.body)
  // const data = await req.formData();
  // const sourceFileName = data.get('file') as unknown as string;
  
  // const file: File | null = data.get('file') as unknown as File;
  // console.log(file);


  // const destinationBlobName = file.name;

  // if (!file) {
  //   return NextResponse.json({ success: false })
  // } 


  // try {
  //   const url = await uploadBlob(sourceFileName, destinationBlobName);
  //   NextResponse.json({ message: 'Upload successful', url });
  // } catch (error : any) {
  //   NextResponse.json({ message: 'Upload failed', error: error.message });
  // }

  try {
    // Your logic here
    // const data = await fetchSomeData(); // Example asynchronous operation

    // If everything is successful, return the data
    return res.json(req.body);
 } catch (error) {
    // If there's an error, return an error response
    return res.json({ error: 'An error occurred' });
 }
};
