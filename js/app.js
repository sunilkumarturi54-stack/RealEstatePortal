/**
 * Core Application Controller
 */
import { getProperties } from './properties.js';
import { initTheme } from './theme.js';
import { getFavorites, toggleFavorite, updateFavBadge } from './favorites.js';
import { openModal, closeModal, initModalEvents } from './modal.js';
import { applyFilters } from './filters.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateFavBadge();
  initModalEvents();
  initScrollEffects();
  
  // Page Specific Inits
  if (document.getElementById('property-grid')) {
    renderMainGrid();
    setupFilterListeners();
  }
});

// Toast Utility
export const showToast = (msg) => {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

const createToastContainer = () => {
  const c = document.createElement('div');
  c.id = 'toast-container';
  document.body.appendChild(c);
  return c;
};

// Main Grid Rendering Function
export const renderMainGrid = () => {
  const grid = document.getElementById('property-grid');
  if(!grid) return;
  
  const properties = applyFilters(getProperties());
  const favs = getFavorites();

  if(properties.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem;"><h3>No listings found matching your criteria.</h3></div>`;
    return;
  }

  grid.innerHTML = properties.map(p => `
    <div class="card animate-zoom-in">
      <div class="card-img-wrapper">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="badge badge-type">${p.type}</span>
        <span class="badge badge-status ${p.status}">${p.status}</span>
        <button class="fav-btn ${favs.includes(p.id) ? 'active' : ''}" onclick="handleFavClick(event, '${p.id}')">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
      <div class="card-content">
        <div class="card-price">$${p.price.toLocaleString()}</div>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-address"><i class="fa-solid fa-location-dot"></i> ${p.address}</p>
        <div class="card-specs">
          <span><i class="fa-solid fa-bed"></i> ${p.bedrooms} Beds</span>
          <span><i class="fa-solid fa-bath"></i> ${p.bathrooms} Baths</span>
          <span><i class="fa-solid fa-ruler-combined"></i> ${p.area} sqft</span>
        </div>
        <button class="btn-primary" style="margin-top:1rem; width:100%" onclick="showDetails('${p.id}')">View Details</button>
      </div>
    </div>
  `).join('');
};

window.handleFavClick = (e, id) => {
  e.stopPropagation();
  const isFav = toggleFavorite(id);
  e.currentTarget.classList.toggle('active', isFav);
  showToast(isFav ? 'Property added to favorites!' : 'Removed from favorites.');
};

window.showDetails = (id) => {
  const p = getProperties().find(item => item.id === id);
  if(!p) return;

  const content = document.getElementById('modal-details-content');
  content.innerHTML = `
    <img src="${p.image}" style="width:100%; height:350px; object-fit:cover;">
    <div style="padding: 2rem;">
      <h2>${p.title}</h2>
      <h3 style="color:var(--accent);">$${p.price.toLocaleString()}</h3>
      <p style="margin: 1rem 0; color:var(--text-muted);">${p.description}</p>
      <h4>Amenities</h4>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin:0.5rem 0 1.5rem;">
        ${p.amenities.map(a => `<span style="background:var(--bg-hover); padding:0.4rem 0.8rem; border-radius:20px; font-size:0.85rem;">${a}</span>`).join('')}
      </div>
      <button class="btn-primary" onclick="openContactForm('${p.title}')">Contact Owner</button>
    </div>
  `;
  openModal('details-modal');
};

const setupFilterListeners = () => {
  const inputs = ['filter-location', 'filter-type', 'filter-beds', 'filter-price', 'filter-sort'];
  inputs.forEach(id => {
    document.getElementById(id)?.addEventListener('change', renderMainGrid);
    document.getElementById(id)?.addEventListener('input', renderMainGrid);
  });
};

const initScrollEffects = () => {
  window.addEventListener('scroll', () => {
    // Navbar Sticky Transition
    const nav = document.querySelector('.navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);

    // Progress Bar
    const progress = document.querySelector('.scroll-progress');
    if (progress) {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${(window.scrollY / totalScroll) * 100}%`;
    }

    // Scroll to Top Button
    const topBtn = document.querySelector('.back-to-top');
    if (topBtn) topBtn.classList.toggle('visible', window.scrollY > 300);
  });
};