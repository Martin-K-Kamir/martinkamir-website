const main = document.querySelector('.container__main');

const contentWhiteSlider = document.querySelector('.content__white-slider');
const contentProjects = document.querySelector('.content__projects');

const projectsBox = document.querySelectorAll('.projects__box');
const projectsSubtitle = document.querySelectorAll('.projects__subtitle');

const btnProjects = document.querySelector('.btn-projects');
const btnInvisible = document.querySelector('.invisible');
const btnCopy = document.querySelector('.btn-copy');

class View {
  addHandlerClick(handler, el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();

      handler();
    });
  }

  addHandlerLeave(handler, el) {
    el.addEventListener('mouseleave', function () {
      handler();
    });
  }

  showProjects() {
    main.classList.add('height-sticky');
    contentWhiteSlider.classList.remove('hidden');
    contentProjects.classList.remove('hidden');
  }

  copiedMsg() {
    btnInvisible.innerHTML = 'Copied';
  }

  copyEmailMsg() {
    setTimeout(() => {
      btnInvisible.innerHTML = 'Copy email';
    }, 200);
  }

  copyToClipboard(data) {
    new ClipboardJS(data);
  }

  _restoreTxt(savedTxt) {
    projectsBox.forEach(curBox => {
      curBox.addEventListener('mouseleave', function () {
        curBox.querySelector('.projects__subtitle').textContent = savedTxt;
      });
    });
  }

  changeTxt() {
    projectsBox.forEach(curBox => {
      curBox.addEventListener(
        'mouseenter',
        function () {
          const saveTxt = curBox.querySelector('.projects__subtitle').innerHTML;

          curBox.querySelector('.projects__subtitle').textContent =
            'GitHub repository';

          this._restoreTxt(saveTxt);
        }.bind(this)
      );
    });
  }
}
const view = new View();

const runView = function () {
  // 1. Show Projects
  view.addHandlerClick(view.showProjects, btnProjects);

  // 2. Change text to GitHub on mouseenter after mouseleave restore init text
  view.changeTxt();

  // 3. On click btnCopy clipboard email
  view.copyToClipboard(btnCopy);

  // 4. On click btnCopy change text to copied
  view.addHandlerClick(view.copiedMsg, btnCopy);

  // 5. On click btnCopy restore init text
  view.addHandlerLeave(view.copyEmailMsg, btnCopy);
};
runView();
