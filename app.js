const STORAGE_KEY = "bloodnetKeralaRecords";

const sampleRecords = [
  {id:1,type:"donor",name:"Amit Sharma",phone:"9123456780",bloodGroup:"A+",district:"Ernakulam",hospital:"General Hospital Ernakulam",status:"Available",lastDonation:"2026-05-12"},
  {id:2,type:"donor",name:"Priya Nair",phone:"9845612309",bloodGroup:"A+",district:"Kochi",hospital:"Medical Trust Hospital",status:"Available",lastDonation:"2026-06-01"},
  {id:3,type:"donor",name:"Rahul Menon",phone:"9753108642",bloodGroup:"B+",district:"Thiruvananthapuram",hospital:"General Hospital TVM",status:"Available",lastDonation:"2026-04-20"},
  {id:4,type:"donor",name:"Fathima Khan",phone:"9987654321",bloodGroup:"B+",district:"Kozhikode",hospital:"Government Medical College Kozhikode",status:"Available",lastDonation:"2026-05-25"},
  {id:5,type:"donor",name:"Suresh Kumar",phone:"9012345678",bloodGroup:"O+",district:"Thrissur",hospital:"District Hospital Thrissur",status:"Available",lastDonation:"2026-03-18"},
  {id:6,type:"recipient",name:"Anjali Varma",phone:"9876501234",bloodGroup:"O+",district:"Kottayam",hospital:"Government Medical College Kottayam",status:"Emergency",units:2},
  {id:7,type:"recipient",name:"John D'Souza",phone:"9112233445",bloodGroup:"AB+",district:"Kollam",hospital:"District Hospital Kollam",status:"Urgent",units:1},
  {id:8,type:"donor",name:"Karthik Varma",phone:"9098765432",bloodGroup:"AB+",district:"Palakkad",hospital:"District Hospital Palakkad",status:"Available",lastDonation:"2026-06-11"}
];

function getRecords(){
  const saved = localStorage.getItem(STORAGE_KEY);
  if(saved) return JSON.parse(saved);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleRecords));
  return sampleRecords;
}

function saveAll(records){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function maskPhone(phone){
  return "******" + String(phone).slice(-4);
}

function openForm(type){
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("recordType").value = type;
  const donor = type === "donor";
  document.getElementById("formEyebrow").textContent = donor ? "DONATION" : "RECIPIENT";
  document.getElementById("formTitle").textContent = donor ? "Register Donor" : "Register Recipient";
  document.getElementById("lastDonationWrap").style.display = donor ? "block" : "none";
  document.getElementById("unitsWrap").classList.toggle("hidden-field", donor);
  document.getElementById("urgencyWrap").classList.toggle("hidden-field", donor);
  document.getElementById("status").innerHTML = donor
    ? '<option>Available</option><option>Pending Verification</option><option>Inactive</option>'
    : '<option>Emergency</option><option>Urgent</option><option>Routine</option>';
}

function closeModal(){
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("recordForm").reset();
}

function saveRecord(event){
  event.preventDefault();
  const type = document.getElementById("recordType").value;
  const record = {
    id: Date.now(),
    type,
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    bloodGroup: document.getElementById("bloodGroup").value,
    district: document.getElementById("district").value,
    hospital: document.getElementById("hospital").value.trim(),
    status: document.getElementById("status").value
  };

  if(type === "donor"){
    record.lastDonation = document.getElementById("lastDonation").value;
  }else{
    record.units = Number(document.getElementById("units").value || 1);
    record.urgency = document.getElementById("urgency").value;
  }

  const records = getRecords();
  records.unshift(record);
  saveAll(records);
  closeModal();
  renderRecords();
  document.getElementById("records").scrollIntoView({behavior:"smooth"});
}

function renderRecords(){
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const blood = document.getElementById("bloodFilter").value;
  const type = document.getElementById("typeFilter").value;

  const filtered = getRecords().filter(r => {
    const matchesText = [r.name,r.district,r.hospital,r.bloodGroup].join(" ").toLowerCase().includes(query);
    const matchesBlood = !blood || r.bloodGroup === blood;
    const matchesType = !type || r.type === type;
    return matchesText && matchesBlood && matchesType;
  });

  const groups = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
  const grid = document.getElementById("groupGrid");

  grid.innerHTML = groups.map(group => {
    const records = filtered.filter(r => r.bloodGroup === group);
    const cls = group.startsWith("A") || group.startsWith("O") ? "red" : "blue";
    return `
      <article class="group-card ${cls}">
        <div class="group-head"><span>${group}</span><span>${records.length}</span></div>
        <div class="group-body">
          ${records.length ? records.map(r => `
            <div class="record">
              <div><strong>${escapeHtml(r.name)}</strong><div class="small">${r.type === "donor" ? "Donor" : "Recipient"}</div></div>
              <div>${escapeHtml(r.district)}</div>
              <div>${maskPhone(r.phone)}</div>
              <div><span class="badge">${escapeHtml(r.status)}</span></div>
            </div>
          `).join("") : `<div class="empty">No matching records</div>`}
        </div>
      </article>
    `;
  }).join("");
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

function showStaffNote(){
  alert("Demo mode: staff authentication is not implemented here. For a real hospital system, add role-based login, server-side authorization, audit logging and encrypted transport/storage.");
}

document.addEventListener("DOMContentLoaded", renderRecords);
