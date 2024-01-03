export const alertAndLogin = (text: string) => {
  alert(text);
  window.location.replace(`${process.env.NEXT_PUBLIC_REDIRECT_URL}?way=logout`);
};
