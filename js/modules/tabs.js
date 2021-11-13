function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabsActiveClass) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(tabscontent => {
      tabscontent.classList.add("hide");
      tabscontent.classList.remove("show", "fade");

      tabs.forEach(tabheader => {
        tabheader.classList.remove(tabsActiveClass);
      })
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(tabsActiveClass);
  }
  
  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((tabheader, index) => {
        if (target == tabheader) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  hideTabContent();
  showTabContent();

};

export default tabs;