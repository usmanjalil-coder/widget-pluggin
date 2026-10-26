import callApi from "@/lib/api";

export function submitContactMessage(data) {
  return callApi({ url: "contact", method: "POST", data, toastr: false });
}
