export const handleSignup = async (email: string, password: string) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};
export const handleLogin = async (email: string, password: string) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  const test = await res.json();
  return test;
};
