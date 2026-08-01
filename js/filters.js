/**
 * Real-time Property Filtering Engine
 */
export const applyFilters = (properties) => {
  const loc = document.getElementById('filter-location')?.value || '';
  const type = document.getElementById('filter-type')?.value || '';
  const beds = document.getElementById('filter-beds')?.value || '';
  const maxPrice = document.getElementById('filter-price')?.value || Infinity;
  const sort = document.getElementById('filter-sort')?.value || 'newest';

  let filtered = properties.filter(item => {
    return (!loc || item.location.includes(loc)) &&
           (!type || item.type === type) &&
           (!beds || item.bedrooms >= parseInt(beds)) &&
           (item.price <= parseFloat(maxPrice));
  });

  // Sorting Logic
  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);

  return filtered;
};