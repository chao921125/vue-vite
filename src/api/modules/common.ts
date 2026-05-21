import Axios from "@/plugins/http";
import AxiosConfig from "@/config/httpConfig";
import type {
  UploadFileParams,
  PreviewFileParams,
  QueryIpParams,
  IpInfoResponse,
  FileInfo,
} from "#/types";

export default {
  getImgLocale: (name: string, suffix?: string) => {
    if (!name) return "";
    if (!suffix) suffix = "png";
    // return `/src/assets/images/${type}.${suffix}`;
    return new URL(`/src/assets/images/${name}.${suffix}`, import.meta.url).href;
  },
  previewFileById: (data: PreviewFileParams | string | number) => {
    return Axios<FileInfo>({
      url: `${AxiosConfig.uploadUrl}/login/${typeof data === "object" ? data.id : data}`,
      method: "GET",
      responseType: "blob",
      data,
    });
  },
  previewFile: (data: PreviewFileParams) => {
    return Axios<FileInfo>({
      url: `${AxiosConfig.uploadUrl}`,
      method: "GET",
      responseType: "blob",
      data,
    });
  },
  uploadFile: (data?: UploadFileParams | FormData) => {
    return Axios<FileInfo>({
      url: `${AxiosConfig.uploadUrl}`,
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
  },
  queryAddressByIp: (data: QueryIpParams = {}) => {
    return Axios<IpInfoResponse>({
      url: `${AxiosConfig.ipUrl}/index?ip=${data.ip}&type=0`,
      method: "GET",
      data,
    });
  },
  queryIp: (data: QueryIpParams = {}) => {
    return Axios<IpInfoResponse>({
      url: `${AxiosConfig.uploadUrl}/index?ip=&type=0`,
      method: "GET",
      data,
    });
  },
};
