export const getUrl = (url: string): string | never => {
  if (process.env.RUNTIME_ENV === "client") {
    return url;
  }

  const PORT = process.env.PORT;

  if (!PORT) {
    throw new Error("Missing 'process.env.PORT'.");
  }

  return `http://localhost:${PORT}${url}`;
};

export const redirectTo = (url: string) => {
  window.location.href = url;
};