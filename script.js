const panchayat = document.getElementById('panchayat');
const locationTitle = document.getElementById('locationTitle');
const locationMeta = document.getElementById('locationMeta');
const refreshBtn = document.getElementById('refreshBtn');
const applyBtn = document.getElementById('applyBtn');

const profiles = {
  "Sample Panchayat A": {temp:"27°", rain:"18 mm", humidity:"72%", wind:"11 km/h", condition:"Partly Cloudy", confidence:"87%"},
  "Sample Panchayat B": {temp:"29°", rain:"14 mm", humidity:"68%", wind:"13 km/h", condition:"Cloudy", confidence:"84%"},
  "Sample Panchayat C": {temp:"26°", rain:"31 mm", humidity:"81%", wind:"9 km/h", condition:"Rain Expected", confidence:"91%"}
};

function applyLocation(){
  const name = panchayat.value;
  const p = profiles[name] || profiles["Sample Panchayat A"];
  locationTitle.textContent = name;
  locationMeta.textContent = `${document.getElementById('block').value} Block • ${document.getElementById('district').value} District • ${document.getElementById('state').value}`;
  document.getElementById('temp').textContent = p.temp;
  document.getElementById('rain').textContent = p.rain;
  document.getElementById('humidity').textContent = p.humidity;
  document.getElementById('wind').textContent = p.wind;
  document.getElementById('condition').textContent = p.condition;
  document.getElementById('confidence').textContent = p.confidence;
  document.getElementById('updated').textContent = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
}
applyBtn.addEventListener('click', applyLocation);
refreshBtn.addEventListener('click', () => { applyLocation(); refreshBtn.textContent='✓ Updated'; setTimeout(()=>refreshBtn.textContent='↻ Refresh',1200); });

document.querySelectorAll('.nav-item').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.section;
    if(target !== 'overview') alert(`${target.charAt(0).toUpperCase()+target.slice(1)} module is ready for backend integration.`);
  });
});
document.querySelector('[data-section-target="advisory"]').addEventListener('click',()=>alert('Agro Advisory module: connect this view to validated IMD advisory logic and the KAVACH-RF forecast API.'));
