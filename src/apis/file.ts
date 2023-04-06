import { FileVO } from "../data/FileVO";
import curl from "../utils/curl"

async function upload(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await curl.post('api/poppy/v1/files/file', formData);
  return response.data as FileVO
}

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await curl.post('api/poppy/v1/files/img', formData);
  return response.data as FileVO
}

async function uploadWebModule(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await curl.post('api/poppy/v1/files/web-module', formData);
  return response.data as FileVO
}

export default {
  upload,
  uploadImage,
  uploadWebModule
}
