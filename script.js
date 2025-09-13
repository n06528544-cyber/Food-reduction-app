// ======================
// Mobile menu toggle
// ======================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// ======================
// Smooth scroll for all nav links
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({behavior:'smooth'});
      if(!mobileMenu.classList.contains('hidden')){
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

// ======================
// Leaflet Map Setup
// ======================
const map = L.map('mapid').setView([28.6139,77.2090], 12); // Delhi coordinates
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:19
}).addTo(map);

// Dummy listings
const listings = [
  {name:'Pizza Surplus', lat:28.6139, lng:77.2090, quantity:5, info:'Pick up by 6PM'},
  {name:'Bread & Pastries', lat:28.6239, lng:77.2190, quantity:10, info:'Delivery available'},
  {name:'Vegetable Box', lat:28.6039, lng:77.1990, quantity:8, info:'Pickup only'}
];

listings.forEach(item=>{
  L.marker([item.lat, item.lng]).addTo(map)
    .bindPopup(`<b>${item.name}</b><br>Qty: ${item.quantity}<br>${item.info}<br><button onclick="claimPost('${item.name}')"
    class="mt-2 px-2 py-1 bg-green-400 text-gray-900 rounded hover:bg-green-500">Claim Food</button>`);
});

// Dummy claim function
function claimPost(name){
  alert(`You have claimed: ${name}`);
}

// ======================
// Surplus Food Posts
// ======================
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

postForm.addEventListener('submit', e=>{
  e.preventDefault();
  const formData = new FormData(postForm);
  const post = {
    name: formData.get('Food Name'),
    quantity: formData.get('Quantity'),
    expiry: formData.get('Expiry Date'),
    info: formData.get('Collection/Delivery Info')
  };
  const postDiv = document.createElement('div');
  postDiv.className = 'bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition';
  postDiv.innerHTML = `
    <h3 class="text-xl font-bold text-green-400">${post.name}</h3>
    <p>Quantity: ${post.quantity}</p>
    <p>Expiry: ${post.expiry}</p>
    <p>Info: ${post.info}</p>
    <button onclick="claimPost('${post.name}')"
    class="mt-2 px-2 py-1 bg-green-400 text-gray-900 rounded hover:bg-green-500">Claim Food</button>`;
  postsContainer.appendChild(postDiv);
  postForm.reset();
});

// ======================
// Recipe Generator
// ======================
const recipeBtn = document.getElementById('recipeBtn');
const recipeOutput = document.getElementById('recipeOutput');

recipeBtn.addEventListener('click',()=>{
  const ingredients = document.getElementById('recipeInput').value.split(',').map(i=>i.trim()).filter(Boolean);
  if(ingredients.length===0){
    recipeOutput.innerHTML="<p class='text-red-500'>Please enter ingredients.</p>";
    return;
  }
  let recipes = '<ul class="list-disc ml-6">';
  ingredients.forEach((ing,i)=>{
    recipes+=`<li>Recipe idea with <b>${ing}</b></li>`;
  });
  recipes+='</ul>';
  recipeOutput.innerHTML = recipes;
});

// ======================
// Volunteer Signup
// ======================
const volunteerForm = document.getElementById('volunteerForm');
volunteerForm.addEventListener('submit', e=>{
  e.preventDefault();
  const name = volunteerForm.querySelector('input[type="text"]').value;
  alert(`Thank you ${name} for signing up as a volunteer!`);
  volunteerForm.reset();
});

// ======================
// Analytics Dashboard (Dummy counters)
// ======================
let mealsSaved=0, co2Reduced=0, activeDonors=0, activeVolunteers=0;
function updateAnalytics(){
  mealsSaved += Math.floor(Math.random()*5)+1;
  co2Reduced += Math.floor(Math.random()*2)+1;
  activeDonors += Math.floor(Math.random()*2);
  activeVolunteers += Math.floor(Math.random()*1);
  document.getElementById('mealsSaved').innerText = mealsSaved;
  document.getElementById('co2Reduced').innerText = co2Reduced;
  document.getElementById('activeDonors').innerText = activeDonors;
  document.getElementById('activeVolunteers').innerText = activeVolunteers;
}
setInterval(updateAnalytics,3000);

// ======================
// Optional: Blog hover animations
// ======================
document.querySelectorAll('#blog .bg-gray-800').forEach(el=>{
  el.addEventListener('mouseenter', ()=>el.classList.add('scale-105'));
  el.addEventListener('mouseleave', ()=>el.classList.remove('scale-105'));
});
