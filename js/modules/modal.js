function modal() {
  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");

  function modalOpen() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer); 
  };

  const modalTimer = setTimeout(modalOpen, 50000);

  modalTrigger.forEach( btn => {
    btn.addEventListener("click", modalOpen);
  });

  function modalClose() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      modalClose();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      modalClose();
    }
  });

  function showModalByScroll() {
    let pageYOffset = window.pageYOffset,
        clientHeight = document.documentElement.clientHeight,
        scrollHeight = document.documentElement.scrollHeight;
    // пользователь долистал до конца страници(скролл с боку + контент стрницы)
    if (pageYOffset + clientHeight >= scrollHeight) {
      modalOpen();
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);
  
};

module.exports = modal;