import http from "./core";

export function loginApi(req: string) {
  return http.post("/api/login", { code: req });
}

export function refreshApi(refreshToken: string | null) {
  return http.post("/api/refresh", { refreshToken });
}

export function logoutApi() {
  return http.post("/api/logout");
}

