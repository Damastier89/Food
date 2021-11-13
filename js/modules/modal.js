function modalOpen(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId); 
  }
  
};

function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = "none";
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  modalTrigger.forEach( btn => {
    btn.addEventListener("click", () => modalOpen(modalSelector, modalTimerId));
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      modalClose(modalSelector);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      modalClose(modalSelector);
    }
  });

  function showModalByScroll() {
    let pageYOffset = window.pageYOffset,
        clientHeight = document.documentElement.clientHeight,
        scrollHeight = document.documentElement.scrollHeight;
    // пользователь долистал до конца страници(скролл с боку + контент стрницы)
    if (pageYOffset + clientHeight >= scrollHeight) {
      modalOpen(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);
  
};

export default modal;
export { modalOpen };
export { modalClose }; 