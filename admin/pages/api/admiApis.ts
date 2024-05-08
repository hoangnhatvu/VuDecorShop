import requestApi from "./apiConfig";
import type { requestApiProps } from "./apiConfig";

const getInfoDashboard = async () => {
  try {
    const request: requestApiProps = {
      endpoint: "admin/getInfoDashboard",
      method: "POST",
      params: undefined,
      body: {},
      responseType: undefined,
    };
    const response = await requestApi(request);
    return response.data;
  } catch (error) {
    throw new Error("Không lấy được thông tin thống kê !")
  }
};

export { getInfoDashboard };
