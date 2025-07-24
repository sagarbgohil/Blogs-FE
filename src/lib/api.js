export const fetchV1 = async (url, options = {}) => {
  const isFormData =
    (typeof FormData !== "undefined" && options.body instanceof FormData) ||
    options.body?.constructor?.name === "FormData";

  let headers = {
    ...options.headers,
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${apiUrl}/api/v1${url}`, {
    ...options,
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  return response;
};

export const fetchWithAuthV1 = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  const isFormData =
    (typeof FormData !== "undefined" && options.body instanceof FormData) ||
    options.body?.constructor?.name === "FormData";

  let headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

  let res = await fetch(`${apiUrl}/api/v1${url}`, {
    ...options,
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  if (res.status === 401) {
    const refreshRes = await fetch(`${apiUrl}/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken"),
      }),
    });

    if (refreshRes.status === 200) {
      const refreshData = await refreshRes.json();
      localStorage.setItem("accessToken", refreshData.data.accessToken);

      headers["Authorization"] = `Bearer ${refreshData.data.accessToken}`;

      res = await fetch(`${apiUrl}/api/v1${url}`, {
        ...options,
        headers,
        body: options.body,
      });
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/auth/sign-in";
      return;
    }
  }

  return res;
};
