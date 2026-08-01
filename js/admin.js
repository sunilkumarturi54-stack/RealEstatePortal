/**
 * Admin Panel Execution Script
 */
import { getProperties, saveProperties } from './properties.js';
import { showToast } from './app.js';

export const renderAdminTable = () => {
  const tableBody = document.getElementById('admin-table-body');
  if(!tableBody) return;
  
  const properties = getProperties();
  tableBody.innerHTML = properties.map(p => `
    <tr>
      <td><img src="${p.image}" width="50" height="35" style="object-fit:cover; border-radius:4px;"></td>
      <td><strong>${p.title}</strong></td>
      <td>${p.location}</td>
      <td>$${p.price.toLocaleString()}</td>
      <td><span class="badge badge-status ${p.status}">${p.status}</span></td>
      <td>
        <button onclick="deleteProperty('${p.id}')" style="color:#EF4444;"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');

  // Update Stats Counters
  document.getElementById('stat-total').textContent = properties.length;
  document.getElementById('stat-active').textContent = properties.filter(p => p.status === 'Available').length;
};

window.deleteProperty = (id) => {
  if (confirm('Are you sure you want to delete this listing?')) {
    const properties = getProperties().filter(p => p.id !== id);
    saveProperties(properties);
    renderAdminTable();
    showToast('Listing removed successfully.');
  }
};