const activities = ["一起吃饭 🍜", "看电影 🎬", "逛街 🛍️", "散步 🌙"];
const state = { answer: null, activity: null, date: null };

const app = document.getElementById("app");

function render(html) {
  app.innerHTML = html;
}

function nextToAnswer() {
  render(`
    <h1>你确定吗？</h1>
    <p class="sub">再想一下嘛 👀</p>
    <button class="primary" id="sure">我确定！</button>
  `);
  document.getElementById("sure").onclick = () => {
    state.answer = "YES";
    chooseActivity();
  };
}

function start() {
  render(`
    <h1>你愿意跟我出去吗？</h1>
    <div class="buttons">
      <button class="primary" id="yes">YES</button>
      <button class="secondary" id="no">NO</button>
    </div>
  `);
  document.getElementById("yes").onclick = () => {
    state.answer = "YES";
    chooseActivity();
  };
  document.getElementById("no").onclick = nextToAnswer;
}

function chooseActivity() {
  render(`
    <h1>你想一起做什么？</h1>
    <p class="sub">选一个你想和我一起做的</p>
    <div class="choices">
      ${activities.map((x,i)=>`<button class="choice" data-i="${i}">${x}</button>`).join("")}
    </div>
  `);
  document.querySelectorAll(".choice").forEach(btn => {
    btn.onclick = () => {
      state.activity = activities[Number(btn.dataset.i)];
      chooseDate();
    };
  });
}

function chooseDate() {
  render(`
    <h1>挑一天约会吧</h1>
    <p class="sub">选一天，安排我们的小小约会吧。</p>
    <input id="date" type="date">
    <button class="primary full" id="continue">继续 →</button>
    <p id="error" class="error"></p>
  `);
  document.getElementById("continue").onclick = () => {
    const date = document.getElementById("date").value;
    if (!date) {
      document.getElementById("error").textContent = "先选一个日期嘛 ❤️";
      return;
    }
    state.date = date;
    saveAndFinish();
  };
}

async function saveResponse() {
  if (!window.SUPABASE_URL || window.SUPABASE_URL.startsWith("YOUR_")) {
    return { ok: false, skipped: true };
  }

  const payload = {
    answer: state.answer,
    activity: state.activity,
    date: state.date,
    user_agent: navigator.userAgent
  };

  try {
    const res = await fetch(`${window.SUPABASE_URL}/rest/v1/love_responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": window.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${window.SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

async function saveAndFinish() {
  render(`
    <h1>耶！</h1>
    <p class="sub">你答应我，我真的好开心。</p>
    <div class="loading">正在保存这份小小的约定…… ❤️</div>
  `);

  await saveResponse();

  render(`
    <div class="letter">
      <div class="file-title">❤ 情书.txt ×</div>
      <p>不管怎样，你都真的很可爱。</p>
      <p>不要让任何人告诉你不是，好吗？</p>
      <p>有你在，每个平凡的日子都变得特别。</p>
      <p>今天，以及每一天，我都想庆祝有你、有我们。</p>
      <p>亲亲，<br>你的他 ❤</p>
    </div>
    <button class="primary full" id="again">就这样约了！💌</button>
    <button class="secondary full" id="replay">再看一次</button>
  `);

  document.getElementById("again").onclick = () => {
    document.querySelector(".card").classList.add("pop");
    setTimeout(() => document.querySelector(".card").classList.remove("pop"), 300);
  };
  document.getElementById("replay").onclick = start;
}

start();