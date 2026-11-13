const menu=document.querySelector('.menu');
const backdrop=document.querySelector('.backdrop');
const searchPanel=document.querySelector('.search-panel');
const wishlistPanel=document.querySelector('.wishlist-panel');
const categories=['Vestidos','Calças','Blusas','Joias','Sapatos','Óculos','Saias','Lingeries'];
const panels=[menu,searchPanel,wishlistPanel];

function closeAll(){panels.forEach(panel=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')});backdrop.classList.remove('open');}
function openPanel(panel){closeAll();panel.classList.add('open');panel.setAttribute('aria-hidden','false');backdrop.classList.add('open');}

document.querySelector('.hamburger').addEventListener('click',()=>openPanel(menu));
document.querySelector('.close').addEventListener('click',closeAll);
document.querySelector('.search').addEventListener('click',()=>{openPanel(searchPanel);searchInput.value='';filterOptions.hidden=true;filterToggle.setAttribute('aria-expanded','false');filterToggle.querySelector('b').textContent='+';renderSearch();setTimeout(()=>searchInput.focus(),280)});
document.querySelector('.wishlist-button').addEventListener('click',()=>{renderWishlist();openPanel(wishlistPanel)});
document.querySelector('.close-search').addEventListener('click',closeAll);
document.querySelector('.close-wishlist').addEventListener('click',closeAll);
backdrop.addEventListener('click',closeAll);
document.querySelectorAll('.menu a').forEach(link=>link.addEventListener('click',closeAll));

const message=document.querySelector('.catalog-placeholder p');
function selectCategory(category){const target=[...document.querySelectorAll('.filters a')].find(link=>link.textContent===category);document.querySelectorAll('.filters a').forEach(link=>link.classList.remove('is-active'));target?.classList.add('is-active');message.textContent=`${category} estará disponível em breve.`;}
document.querySelectorAll('.filters a').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();selectCategory(link.textContent)}));

const searchInput=document.querySelector('#search-input');
const searchResults=document.querySelector('.search-results');
const filterToggle=document.querySelector('.filter-toggle');
const filterOptions=document.querySelector('.filter-options');
function renderSearch(){const term=searchInput.value.trim().toLowerCase();const selected=[...filterOptions.querySelectorAll('input:checked')].map(input=>input.value);let results=categories.filter(item=>item.toLowerCase().includes(term));if(selected.length)results=results.filter(item=>selected.includes(item));searchResults.innerHTML=term||selected.length?results.length?results.map(item=>`<button class="search-result" data-category="${item}">${item}</button>`).join(''):'<p class="empty-search">Nenhum item encontrado.</p>':'';searchResults.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{selectCategory(button.dataset.category);closeAll();document.querySelector('#produtos').scrollIntoView({behavior:'smooth'});}));}
filterToggle.addEventListener('click',()=>{const open=filterOptions.hidden;filterOptions.hidden=!open;filterToggle.setAttribute('aria-expanded',String(open));filterToggle.querySelector('b').textContent=open?'−':'+';});
filterOptions.querySelectorAll('input').forEach(input=>input.addEventListener('change',renderSearch));
searchInput.addEventListener('input',renderSearch);

function renderWishlist(){const saved=JSON.parse(localStorage.getItem('jostnny-wishlist')||'[]');document.querySelector('.wishlist-results').innerHTML=saved.length?saved.map(item=>`<button class="search-result">${item}</button>`).join(''):'<p class="empty-wishlist">Sua lista de desejos está vazia.<br>Quando houver produtos, toque na estrela para salvá-los aqui.</p>';}
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});
