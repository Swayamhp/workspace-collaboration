const backendUrl =
  import.meta.env.VITE_BACKEND_URL;

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
) => {

  let res = await fetch(
    `${backendUrl}${url}`,
    {
      ...options,

      credentials: "include",
    }
  );

  // ACCESS TOKEN EXPIRED
  if (res.status === 401) {

    const refreshRes = await fetch(
      `${backendUrl}/refresh-token`,
      {
        method: "POST",

        credentials: "include",
      }
    );

    // REFRESH SUCCESS
    if (refreshRes.ok) {

      // RETRY ORIGINAL REQUEST
      res = await fetch(
        `${backendUrl}${url}`,
        {
          ...options,

          credentials: "include",
        }
      );
    }
  }

  return res;
};