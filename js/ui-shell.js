(function () {
  'use strict';

  function initShell() {
    if (!document.querySelector('.app-shell')) return;

    if (!document.querySelector('.mobile-menu-button')) {
      const button = document.createElement('button');
      button.className = 'mobile-menu-button';
      button.type = 'button';
      button.setAttribute('aria-label', 'Abrir menú');
      button.textContent = '☰';
      button.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
      document.body.appendChild(button);

      const overlay = document.createElement('div');
      overlay.className = 'mobile-overlay';
      overlay.addEventListener('click', () => document.body.classList.remove('sidebar-open'));
      document.body.appendChild(overlay);
    }

    document.querySelectorAll('.sidebar a').forEach((link) => {
      link.addEventListener('click', () => document.body.classList.remove('sidebar-open'));
    });

    const userName = document.querySelector('[data-user-name]');
    const avatar = document.querySelector('.user-avatar');
    if (userName && avatar) {
      const observer = new MutationObserver(() => {
        avatar.textContent = (userName.textContent.trim().charAt(0) || 'U').toUpperCase();
      });
      observer.observe(userName, { childList: true, characterData: true, subtree: true });
      avatar.textContent = (userName.textContent.trim().charAt(0) || 'U').toUpperCase();
    }

    const params = new URLSearchParams(location.search);
    if (params.get('crear') === '1') {
      window.setTimeout(() => {
        if (window.KMS && typeof window.KMS.openOpportunityForm === 'function') {
          window.KMS.openOpportunityForm();
        }
      }, 450);
    }
  }

  document.addEventListener('DOMContentLoaded', initShell);
}());
