export const registration = async (user) => {
  await fetch("http://localhost:5098/api/login/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};
