import cloudinary from "../config/coudinary.js";

export const extractPublicId =  (url : string ) => {
  const parts = url.split("/");
  const fileName = parts.pop();
  const folder = parts.pop();
  
  if(!fileName || !folder) return "";

  const publicId = `${folder}/${fileName.split(".")[0]}`;
  return publicId;
}

export const uploadImageController = async (c: any) => {
    try {
      const formData =
        await c.req.formData();

      const file = formData.get(
        "image"
      ) as File;

      if (!file) {
        return c.json(
          {
            message:
              "No image uploaded",
          },
          400
        );
      }

      const arrayBuffer =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(arrayBuffer);

      const result =
        await new Promise<any>(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder:
                    "hono-blogs",
                },

                (
                  error,
                  result
                ) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              )
              .end(buffer);
          }
        );

      return c.json(
        {
          message:
            "Image uploaded successfully",

          imageUrl:
            result.secure_url,
        },
        200
      );
    } catch (error) {
      console.log(error);

      return c.json(
        {
          message:
            "Upload failed",
        },
        500
      );
    }
  };

export const updateImageController = async (c: any) => {
    try {

      const formData =
        await c.req.formData();

      const file = formData.get(
        "image"
      ) as File;

      const oldImageUrl =
        formData.get(
          "oldImageUrl"
        ) as string;


      if (!file) {

        return c.json(
          {
            message: "No image uploaded",
          },
          400
        );
      }


      // DELETE OLD IMAGE
      if (oldImageUrl) {

        const publicId =
          extractPublicId(oldImageUrl);

        await cloudinary.uploader.destroy(
          publicId
        );
      }


      // UPLOAD NEW IMAGE
      const arrayBuffer =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(arrayBuffer);

      const result =
        await new Promise<any>(
          (resolve, reject) => {

            cloudinary.uploader
              .upload_stream(
                {
                  folder: "hono-blogs",
                },

                (error, result) => {

                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              )
              .end(buffer);
          }
        );


      return c.json(
        {
          message:
            "Image updated successfully",

          imageUrl:
            result.secure_url,
        },
        200
      );

    } catch (error) {

      console.log(error);

      return c.json(
        {
          message:
            "Image update failed",
        },
        500
      );
    }
  };