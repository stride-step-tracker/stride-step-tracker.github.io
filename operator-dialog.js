(() => {
  const link = document.querySelector('[data-operator-dialog]');
  const dialog = document.getElementById('operator-dialog');
  if (!link || !dialog || typeof dialog.showModal !== 'function') return;
  let previousOverflow = '';
  link.setAttribute('aria-haspopup', 'dialog');
  link.setAttribute('aria-controls', dialog.id);
  link.setAttribute('aria-expanded', 'false');
  link.addEventListener('click', event => {
    event.preventDefault();
    if (dialog.open) return;
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    link.setAttribute('aria-expanded', 'true');
  });
  dialog.querySelectorAll('[data-close-dialog]').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')]
      .filter(control => control.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    link.setAttribute('aria-expanded', 'false');
    link.focus({ preventScroll: true });
  });
})();
