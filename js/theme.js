/**
 * Dark/Light Mode Management
 */
export const initTheme = () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('app_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateToggleIcon(toggleBtn, savedTheme);

  if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('app_theme', next);
      updateToggleIcon(toggleBtn, next);
    });
  }
};

const updateToggleIcon = (btn, theme) => {
  if(!btn) return;
  btn.innerHTML = theme === 'dark' 
    ? '<i class="fa-solid fa-sun" style="color: #D4AF37;"></i>' 
    : '<i class="fa-solid fa-moon"></i>';
};