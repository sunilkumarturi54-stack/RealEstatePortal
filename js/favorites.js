/**
 * Favorite Properties Handler
 */
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem('fav_db')) || [];
};

export const toggleFavorite = (id) => {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(favId => favId !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem('fav_db', JSON.stringify(favs));
  updateFavBadge();
  return favs.includes(id);
};

export const updateFavBadge = () => {
  const badges = document.querySelectorAll('.fav-badge');
  const count = getFavorites().length;
  badges.forEach(b => b.textContent = count);
};