const internships = [
  {title:"Frontend Development Intern",company:"NovaByte Labs",domain:"Web Development",location:"Remote",type:"Internship",duration:"8 weeks",level:"Beginner"},
  {title:"UI/UX Design Intern",company:"PixelCraft Studio",domain:"Design",location:"Remote",type:"Internship",duration:"6 weeks",level:"Beginner"},
  {title:"AI & Machine Learning Intern",company:"FutureMind AI",domain:"Artificial Intelligence",location:"Hybrid",type:"Internship",duration:"10 weeks",level:"Intermediate"},
  {title:"JavaScript Developer Intern",company:"CodeNest Technologies",domain:"Web Development",location:"Remote",type:"Internship",duration:"8 weeks",level:"Beginner"},
  {title:"Data Analytics Intern",company:"InsightGrid",domain:"Data Science",location:"Hybrid",type:"Internship",duration:"8 weeks",level:"Intermediate"},
  {title:"Cyber Security Intern",company:"SecureStack",domain:"Cyber Security",location:"Remote",type:"Internship",duration:"6 weeks",level:"Beginner"},
  {title:"Python Developer Intern",company:"DevOrbit",domain:"Software Development",location:"Remote",type:"Internship",duration:"8 weeks",level:"Beginner"},
  {title:"Cloud Engineering Intern",company:"SkyLayer Systems",domain:"Cloud Computing",location:"Hybrid",type:"Internship",duration:"10 weeks",level:"Intermediate"},
  {title:"Embedded Systems Intern",company:"CircuitWorks",domain:"Embedded Systems",location:"On-site",type:"Internship",duration:"8 weeks",level:"Beginner"}
];

const searchInput = document.querySelector("#search");
const domainSelect = document.querySelector("#domain");
const cards = document.querySelector("#cards");
const resultCount = document.querySelector("#resultCount");
const status = document.querySelector("#status");
const emptyState = document.querySelector("#emptyState");
const errorState = document.querySelector("#errorState");

function initials(name){ return name.split(" ").map(word => word[0]).slice(0,2).join("").toUpperCase(); }

function renderDomains(){
  [...new Set(internships.map(item => item.domain))].sort().forEach(domain => {
    const option=document.createElement("option");
    option.value=domain; option.textContent=domain;
    domainSelect.appendChild(option);
  });
}

function render(){
  try{
    const query=searchInput.value.trim().toLowerCase();
    const domain=domainSelect.value;
    const filtered=internships.filter(item=>{
      const matchesText=!query || [item.title,item.company,item.domain,item.location].some(v=>v.toLowerCase().includes(query));
      const matchesDomain=domain==="all" || item.domain===domain;
      return matchesText && matchesDomain;
    });

    cards.innerHTML="";
    resultCount.textContent=filtered.length;
    status.textContent=`Showing ${filtered.length} ${filtered.length===1?"opportunity":"opportunities"}.`;
    emptyState.hidden=filtered.length!==0;
    errorState.hidden=true;

    filtered.forEach(item=>{
      const article=document.createElement("article");
      article.className="card";
      article.innerHTML=`
        <div class="card-top">
          <div class="logo" aria-hidden="true">${initials(item.company)}</div>
          <span class="tag">${item.level}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="company">${item.company}</p>
        <div class="meta">
          <span>${item.domain}</span><span>${item.location}</span><span>${item.duration}</span>
        </div>
        <div class="card-bottom">
          <span aria-label="Opportunity type">${item.type}</span>
          <a class="apply" href="#" aria-label="View ${item.title} at ${item.company}">View details</a>
        </div>`;
      cards.appendChild(article);
    });
  }catch(error){
    cards.innerHTML="";
    emptyState.hidden=true;
    errorState.hidden=false;
    status.textContent="";
  }
}

function clearFilters(){
  searchInput.value="";
  domainSelect.value="all";
  render();
  searchInput.focus();
}

document.querySelector("#filterForm").addEventListener("submit", e=>e.preventDefault());
searchInput.addEventListener("input",render);
domainSelect.addEventListener("change",render);
document.querySelector("#clearBtn").addEventListener("click",clearFilters);
document.querySelector("#emptyClear").addEventListener("click",clearFilters);
document.querySelector("#retryBtn").addEventListener("click",render);

renderDomains();
render();
