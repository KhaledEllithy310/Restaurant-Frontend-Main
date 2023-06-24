function Open_Close_Nav() {
  const sidebar_btn = document.getElementsByClassName("sidebarbtn")[0];
  if (sidebar_btn.classList.contains('openbtn')) {
    sidebar_btn.style.left = "390px";
    sidebar_btn.classList.replace('openbtn', 'closebtn')
    document.getElementById("mySidebar").style.width = "390px";
    document.getElementById("main").style.marginLeft = "390px";
  }
  else if (sidebar_btn.classList.contains('closebtn')) {
    sidebar_btn.style.left = "0";
    sidebar_btn.classList.replace('closebtn', 'openbtn')
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}
