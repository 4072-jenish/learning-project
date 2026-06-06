import { AppDispatch } from "@/store/store";
import {
    setBlogs,
    setBlog,
    setError,
    setLoading,
    updateBlogInState,
} from "./blogSlice";
import { api } from "@/lib/axios";

interface CreateBlogData {
    title: string;
    content: string;
    image: File | null;
}

interface UpdateBlogData {
  title: string;
  content: string;
  image: File | null;
  oldImageUrl?: string;
}

export const fetchBlogs = () => async (dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await api.get('/blog');
        
        dispatch(setBlogs(res.data.blogs));
    } catch (error) {
        dispatch(setError("Faild to fetch blogs :"));
        console.log(error);
    }finally{
        dispatch(setLoading(false));
    }
}

export const fetchBlogById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const res = await api.get(`/blog/${id}`);
    dispatch(setBlog(res.data.blog));
    return res.data.blog;
  } catch (error) {
    dispatch(setError("Failed to fetch blog"));
    console.log(error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};


export const updateBlog = (id: string, data: UpdateBlogData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      let imageUrl = data.oldImageUrl || "";

      if (data.image) {
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("oldImageUrl", data.oldImageUrl || "");

        const uploadRes = await api.post("/upload/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = uploadRes.data.imageUrl;
      }

      const updatedBlogData = {
        title: data.title,
        content: data.content,
        imageUrl,
      };

      const res = await api.patch(`/blog/${id}`, updatedBlogData);

      const updatedBlog = res.data.blog || res.data;

      dispatch(updateBlogInState(updatedBlog));

      return updatedBlog;
    } catch (error) {
      dispatch(setError("Failed to update blog"));
      console.log(error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createBlog =
  (data: CreateBlogData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      let imageUrl = "";

      // Upload image
      if (data.image) {
        const formData = new FormData();
        formData.append("image", data.image);
        const uploadRes = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = uploadRes.data.imageUrl;
      }
      const blogData = {
        title: data.title,
        content: data.content,
        imageUrl,
      };

      const res = await api.post("/blog", blogData);
      console.log("CREATED BLOG:", res.data);
      dispatch(fetchBlogs());
      return res.data;
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to create blog"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchApprovedBlogs = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await api.get('/blog/approved');
        dispatch(setBlogs(res.data.blogs));
    } catch (error) {
        dispatch(setError("Faild to fetch blogs :"));
        console.log(error);
    }finally{
        dispatch(setLoading(false));
    }
}

export const fetchRejcetedBlogs = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await api.get('/blog/rejected');
        dispatch(setBlogs(res.data.blogs));
    } catch (error) {
        dispatch(setError("Faild to fetch blogs :"));
        console.log(error);
    }finally{
        dispatch(setLoading(false));
    }
}

export const fetchPendingBlogs = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await api.get('/blog/pending');
        dispatch(setBlogs(res.data.blogs));
    } catch (error) {
        dispatch(setError("Faild to fetch blogs :"));
        console.log(error);
    }finally{
        dispatch(setLoading(false));
    }
}
