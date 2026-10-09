import callApi from "@/lib/api";

const request = (url, options = {}) => callApi({ url, toastr: false, ...options });

export const getAccount = async () => (await request("account")).data;
export const updateAccount = async (data) =>
  (await request("account", { method: "PATCH", data })).data;
export const updatePassword = (data) =>
  request("account/password", {
    method: "POST",
    data: {
      current_password: data.currentPassword,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    },
  });
