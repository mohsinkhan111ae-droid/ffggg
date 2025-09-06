/* Script to handle payment flows, QR, UTR submission, and fake notifications */
document.addEventListener('DOMContentLoaded', ()=>{

  // Placeholder config - Replace these values in config.json or edit here
  const CONFIG = {
    whatsapp: '+91XXXXXXXXXX', // << REPLACE with your WhatsApp number >>
    appDownload: '#',          // << REPLACE with your App download link >>
  };

  // Wire up Get App and WhatsApp buttons
  document.getElementById('get-app').href = CONFIG.appDownload;
  const waBtn = document.getElementById('whatsapp-btn');
  waBtn.href = `https://wa.me/${CONFIG.whatsapp.replace(/\+|\s|-/g,'')}`;
  waBtn.textContent = 'Contact on WhatsApp';

  // Payment buttons
  document.querySelectorAll('.pay-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const method = btn.dataset.method;
      startPaymentFlow(method);
    });
  });

  document.getElementById('scan-qr').addEventListener('click', ()=>{
    const qr = document.getElementById('qr-block');
    qr.style.display = qr.style.display === 'flex' ? 'none' : 'flex';
    qr.style.alignItems = 'center';
  });

  // After pay flow (shows notice + UTR field)
  function startPaymentFlow(method){
    const after = document.getElementById('after-pay');
    after.style.display='block';
    document.getElementById('utr-msg').textContent = '';
    // Show animated notice
    // We simulate that user will pay externally; display the message
    // You could integrate deeplinks for each method if desired.
    // Example deeplink placeholders:
    const notice = document.querySelector('.notice');
    notice.textContent = 'Your payment is about to be received, please proceed…';
  }

  document.getElementById('submit-utr').addEventListener('click', ()=>{
    const utr = document.getElementById('utr').value.trim();
    const msg = document.getElementById('utr-msg');
    if(!utr){
      msg.textContent = 'Please enter a valid UTR / transaction id.';
      return;
    }
    msg.textContent = 'UTR submitted. We will verify and confirm within a few minutes.';
    // In a real deployment, you'd POST this to your server here.
  });

  /* --- Fake notifications system --- */
  const notifs = [
    "Rahul withdrew ₹200 successfully",
    "Amit earned ₹350 today",
    "Sana just got ₹500 credited",
    "Neha withdrew ₹150",
    "Vikram received ₹750",
    "Aisha got ₹300 today",
    "Rohit withdrew ₹100",
    "Priya earned ₹450",
    "Karan received ₹250",
    "Zoya withdrew ₹600",
    "Dev earned ₹220",
    "Pooja got ₹420",
    "Manish received ₹180",
    "Farah withdrew ₹900",
    "Aman earned ₹330",
    "Sima got ₹120",
    "Ritu withdrew ₹210",
    "Vivek received ₹260",
    "Nisha earned ₹700",
    "Reena got ₹160"
  ];

  // Expand to 30-40 messages by repeating with small variations
  const generated = [];
  while(generated.length < 40){
    const sample = notifs[Math.floor(Math.random()*notifs.length)];
    const extra = Math.random() < 0.5 ? '' : (' • ' + Math.floor(Math.random()*50+10) + 's ago');
    generated.push(sample + extra);
  }

  const notifContainer = document.getElementById('notif-container');

  let idx = 0;
  function showNextNotif(){
    const text = generated[idx % generated.length];
    const el = document.createElement('div');
    el.className = 'notif';
    el.textContent = text;
    notifContainer.appendChild(el);
    // trigger show
    setTimeout(()=> el.classList.add('show'), 50);
    // remove after 5s
    setTimeout(()=> {
      el.classList.remove('show');
      setTimeout(()=> el.remove(), 400);
    }, 5000);
    idx++;
    // show next between 2-5 seconds
    setTimeout(showNextNotif, 2000 + Math.random()*3000);
  }
  // start after small delay
  setTimeout(showNextNotif, 1200);

});

// Refund submission
document.getElementById('submit-refund').addEventListener('click',()=>{
  const utr = document.getElementById('refund-utr').value.trim();
  const reason = document.getElementById('refund-reason').value.trim();
  const msg = document.getElementById('refund-msg');
  if(!utr || !reason){
    msg.textContent = "Please fill all fields.";
    msg.style.color = "red";
  } else {
    msg.textContent = "Refund request submitted successfully.";
    msg.style.color = "green";
  }
});
