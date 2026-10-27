const operatorLink = document.querySelector('[data-operator-dialog]');
const operatorDialog = document.getElementById('operator-dialog');
if (operatorLink && operatorDialog && typeof operatorDialog.showModal === 'function') {
  let previousOverflow;
  operatorLink.setAttribute('aria-haspopup', 'dialog');
  operatorLink.addEventListener('click', event => {
    event.preventDefault();
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    operatorDialog.showModal();
  });
  operatorDialog.querySelector('[data-close-dialog]').addEventListener('click', () => operatorDialog.close());
  operatorDialog.addEventListener('click', event => {
    if (event.target !== operatorDialog) return;
    const bounds = operatorDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) operatorDialog.close();
  });
  operatorDialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    operatorLink.focus();
  });
}
