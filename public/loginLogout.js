const loginIcon = document.querySelector(".login-icon");
const logoutIcon = document.querySelector(".logout-icon");

if (loginIcon) {
  loginIcon.addEventListener("click", () => {
    window.location.href = "/auth/google";
  });
}

if (logoutIcon) {
  logoutIcon.addEventListener("click", () => {
    window.location.href = "/logout";
  });
}
