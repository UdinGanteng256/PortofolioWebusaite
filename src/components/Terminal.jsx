import { useState, useEffect, useRef, useCallback } from "react";

/* ── FILESYSTEM TREE ─────────────────────────────── */
const FS = {
  "/": ["home", "etc", "usr"],
  "/home": ["pathih"],
  "/home/pathih": ["projects", "skills", "about.txt", "contact.txt", ".secrets"],
  "/home/pathih/projects": ["game-dev", "web-dev"],
  "/home/pathih/projects/game-dev": ["unity-platformer", "rpg-prototype", "endless-runner"],
  "/home/pathih/projects/web-dev": ["porto-v3", "fullstack-api", "react-dashboard"],
  "/home/pathih/skills": ["frontend.txt", "backend.txt", "gamedev.txt", "tools.txt"],
  "/home/pathih/.secrets": ["README.md"],
  "/etc": ["motd"],
  "/usr": ["bin"],
  "/usr/bin": ["fastfetch", "cmatrix", "cava", "tty-clock", "neovim"],
};

const FILE_CONTENTS = {
  "/home/pathih/about.txt": `Name    : Muhammad Pathih
Alias   : fatihgateng01
Role    : Game Developer & Full Stack Programmer
Study   : Politeknik Negeri Media Kreatif — Game Technology
Based   : Jakarta Timur, Indonesia
Status  : Open to freelance & collaboration`,

  "/home/pathih/contact.txt": `Email     : muhammadpathih@gmail.com
GitHub    : github.com/UdinGanteng256
Instagram : @fortune.tihh`,

  "/home/pathih/.secrets/README.md": `You found it. Now you're one of us.

        ██████╗  █████╗ ████████╗██╗  ██╗██╗██╗  ██╗
        ██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██║██║  ██║
        ██████╔╝███████║   ██║   ███████║██║███████║
        ██╔═══╝ ██╔══██║   ██║   ██╔══██║██║██╔══██║
        ██║     ██║  ██║   ██║   ██║  ██║██║██║  ██║
        ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝

Try: sudo rm -rf / (just kidding, don't)
Or: konami`,

  "/home/pathih/skills/frontend.txt": `Frontend Skills
───────────────
React       ██████████  Expert
Next.js     █████████░  Advanced
TypeScript  ████████░░  Advanced
HTML/CSS    ██████████  Expert
Tailwind    █████████░  Advanced`,

  "/home/pathih/skills/backend.txt": `Backend Skills
──────────────
Node.js     ████████░░  Advanced
Python      ███████░░░  Intermediate
Docker      ███████░░░  Intermediate`,

  "/home/pathih/skills/gamedev.txt": `Game Dev Skills
───────────────
Unity       █████████░  Advanced
C#          █████████░  Advanced
Blender     ███████░░░  Intermediate
Game Design ████████░░  Advanced`,

  "/home/pathih/skills/tools.txt": `Tools & Others
──────────────
Git         ██████████  Expert
Vite        █████████░  Advanced
VS Code     ██████████  Expert
Figma       ███████░░░  Intermediate`,

  "/etc/motd": `Welcome to PathihOS v2.6.0 LTS
Kernel: pathih-linux-6.9-arch1-1
Uptime: always coding`,
};

/* ── PROJECTS DATA ───────────────────────────────── */
const PROJECTS = [
  { name: "unity-platformer",  tech: "Unity / C#",     desc: "2D platformer with procedural level generation",  status: "released" },
  { name: "rpg-prototype",     tech: "Unity / C#",     desc: "Top-down RPG with dialogue & inventory system",   status: "wip"      },
  { name: "endless-runner",    tech: "Unity / C#",     desc: "Endless runner with dynamic obstacle spawning",   status: "released" },
  { name: "porto-v3",          tech: "React / Vite",   desc: "This portfolio — 3D, interactive, animated",      status: "released" },
  { name: "fullstack-api",     tech: "Node / Express", desc: "RESTful API with JWT auth & PostgreSQL",          status: "released" },
  { name: "react-dashboard",   tech: "React / Chart",  desc: "Analytics dashboard with real-time data charts",  status: "wip"      },
];

/* ── COMMANDS ────────────────────────────────────── */
const COMMANDS = {
  help: () => [
    { t: "text", v: "" },
    { t: "header", v: "Available Commands" },
    { t: "divider" },
    { t: "cols", v: [
      ["help",       "show this menu"],
      ["about",      "about Muhammad Pathih"],
      ["skills",     "tech stack overview"],
      ["projects",   "list all projects"],
      ["contact",    "contact info"],
      ["whoami",     "current user"],
      ["ls [path]",  "list directory"],
      ["cd [path]",  "change directory"],
      ["cat [file]", "read file content"],
      ["pwd",        "print working directory"],
      ["clear",      "clear terminal"],
      ["fastfetch",  "system info (Arch vibes)"],
      ["cmatrix",    "digital rain"],
      ["tty-clock",  "terminal clock"],
      ["cava",       "audio visualizer"],
      ["neofetch",   "alias for fastfetch"],
      ["uname -a",   "kernel info"],
      ["history",    "command history"],
      ["sudo",       "try it... :)"],
    ]},
    { t: "muted", v: "Easter eggs hidden somewhere. Type wisely." },
    { t: "text", v: "" },
  ],

  about: () => [
    { t: "text", v: "" },
    { t: "green", v: "┌─[ Muhammad Pathih ]────────────────────────────┐" },
    { t: "green", v: "│                                                 │" },
    { t: "green", v: "│  Game Developer & Full Stack Programmer         │" },
    { t: "green", v: "│  Politeknik Negeri Media Kreatif                │" },
    { t: "green", v: "│  Game Technology — Jakarta Timur                │" },
    { t: "green", v: "│                                                 │" },
    { t: "green", v: "│  Passionate about bridging tech & creativity    │" },
    { t: "green", v: "│  Cooking | Gym | Gaming | Exploring design      │" },
    { t: "green", v: "│                                                 │" },
    { t: "green", v: "└─────────────────────────────────────────────────┘" },
    { t: "text",  v: "" },
    { t: "muted", v: "tip: try 'cat /home/pathih/about.txt' for more" },
    { t: "text",  v: "" },
  ],

  skills: () => [
    { t: "text",  v: "" },
    { t: "header", v: "Tech Stack" },
    { t: "divider" },
    { t: "label", v: "Frontend" },
    { t: "bar",   v: { name: "React / Next.js",  pct: 95 } },
    { t: "bar",   v: { name: "TypeScript",        pct: 85 } },
    { t: "bar",   v: { name: "HTML / CSS / Tailwind", pct: 95 } },
    { t: "text",  v: "" },
    { t: "label", v: "Backend" },
    { t: "bar",   v: { name: "Node.js / Express", pct: 80 } },
    { t: "bar",   v: { name: "Python",             pct: 70 } },
    { t: "bar",   v: { name: "Docker",             pct: 65 } },
    { t: "text",  v: "" },
    { t: "label", v: "Game Dev" },
    { t: "bar",   v: { name: "Unity + C#",         pct: 90 } },
    { t: "bar",   v: { name: "Blender 3D",          pct: 70 } },
    { t: "text",  v: "" },
  ],

  projects: () => [
    { t: "text", v: "" },
    { t: "header", v: "Projects" },
    { t: "divider" },
    ...PROJECTS.map(p => ({ t: "project", v: p })),
    { t: "text", v: "" },
  ],

  contact: () => [
    { t: "text", v: "" },
    { t: "header", v: "Contact" },
    { t: "divider" },
    { t: "cols", v: [
      ["email",     "muhammadpathih@gmail.com"],
      ["github",    "github.com/UdinGanteng256"],
      ["instagram", "@fortune.tihh"],
    ]},
    { t: "text", v: "" },
  ],

  whoami: () => [{ t: "green", v: "pathih" }],

  "uname -a": () => [
    { t: "green", v: "Linux pathih-arch 6.9.3-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" },
  ],

  "sudo rm -rf /": () => [
    { t: "red",  v: "[sudo] password for pathih: " },
    { t: "text", v: "" },
    { t: "red",  v: "Nice try. System protected by vibes and good intentions." },
    { t: "muted",v: "(also you don't have root here)" },
  ],

  sudo: () => [
    { t: "red",   v: "[sudo] password for pathih: ••••••••" },
    { t: "text",  v: "" },
    { t: "red",   v: "Sorry, try again." },
    { t: "red",   v: "Sorry, try again." },
    { t: "red",   v: "sudo: 3 incorrect password attempts" },
    { t: "muted", v: "(access denied — this is a portfolio, not a server)" },
  ],

  history: (ctx) => ctx.history.slice(-20).map((h, i) => ({
    t: "muted", v: `  ${String(i + 1).padStart(3, " ")}  ${h}`
  })),
};

/* ── EASTER EGGS ─────────────────────────────────── */
const EASTER_EGGS = {
  konami: [
    { t: "text", v: "" },
    { t: "green", v: "▲▲▼▼◄►◄►BA — UNLOCKED" },
    { t: "text",  v: "" },
    { t: "green", v: "  ██╗██╗   ██╗██████╗ " },
    { t: "green", v: "████║██║   ██║██╔══██╗" },
    { t: "green", v: "╚═██║██║   ██║██████╔╝" },
    { t: "green", v: "  ██║██║   ██║██╔═══╝ " },
    { t: "green", v: "  ██║╚██████╔╝██║     " },
    { t: "green", v: "  ╚═╝ ╚═════╝ ╚═╝     " },
    { t: "text",  v: "" },
    { t: "green", v: "+30 Lives added to your existence" },
    { t: "muted", v: "(not really, but you found it)" },
    { t: "text",  v: "" },
  ],
  "hello world": [
    { t: "green", v: 'puts "Hello, World!" — first program vibes unlocked' },
  ],
  "rm -rf /": [
    { t: "red",  v: "filesystem destroyed... just kidding. Nice try hacker." },
  ],
  arch: [
    { t: "green", v: "btw, I use Arch (at least in this terminal)" },
  ],
  vim: [
    { t: "green", v: ":q!" },
    { t: "muted", v: "— the eternal struggle" },
  ],
  git: [
    { t: "green", v: "git commit -m 'fix everything'" },
    { t: "muted", v: "we've all been there" },
  ],
  exit: [
    { t: "muted", v: "logout — just kidding, you can't leave" },
  ],
  reboot: [
    { t: "text", v: "" },
    { t: "green", v: "Broadcast message from pathih@arch:" },
    { t: "green", v: "The system will reboot NOW!" },
    { t: "text",  v: "" },
    { t: "muted", v: "...rebooting..." },
    { t: "muted", v: "(or just scrolling the page, up to you)" },
  ],
};

/* ── FASTFETCH COMPONENT ─────────────────────────── */
function FastfetchOutput() {
  const logoLines = [
    "                   -`",
    "                  .o+`",
    "                 `ooo/",
    "                `+oooo:",
    "               `+oooooo:",
    "               -+oooooo+:",
    "             `/:-:++oooo+:",
    "            `/++++/+++++++:",
    "           `/++++++++++++++:",
    "          `/+++ooooooooooooo/`",
    "         ./ooosssso++osssssso+`",
    "        .oossssso-````/ossssss+`",
    "       -osssssso.      :ssssssso.",
    "      :osssssss/        osssso+++.",
    "     /ossssssss/        +ssssooo/-",
    "   `/ossssso+/:-        -:/+osssso+-",
    "  `+sso+:-`                 `.-/+oso:",
    " `++:.                           `-/+/",
    " .`                                 `/"
  ];

  const info = [
    { label: "",        value: "",                    labelColor: "#1d4ed8",  valueColor: "#86efac" },
    { label: "",        value: "pathih",               labelColor: "#1d4ed8",  valueColor: "#60a5fa", suffix: "@arch", suffixColor: "#93c5fd" },
    { label: "",        value: "──────────────────────", labelColor: "#1d4ed8", valueColor: "#3b82f6" },
    { label: "OS",      value: "Arch Linux x86_64",    labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "Kernel",  value: "6.9.3-arch1-1",        labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "Shell",   value: "zsh 5.9",              labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "Terminal",value: "pathih-terminal 1.0",  labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "WM",      value: "Hyprland",             labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "Theme",   value: "Catppuccin Mocha",     labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "Icons",   value: "Papirus",              labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "Font",    value: "JetBrains Mono Nerd",  labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "CPU",     value: "AMD Ryzen 7 7800X3D",  labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "GPU",     value: "NVIDIA RTX 4070",      labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "Memory",  value: "3.2GiB / 16.0GiB",    labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "Uptime",  value: "67 days",              labelColor: "#60a5fa",  valueColor: "#e0f2fe" },
    { label: "",        value: "",                    labelColor: "#1d4ed8",  valueColor: "#86efac" },
    { label: "",        value: "\u2588\u2588\u2588\u2591\u2588\u2588\u2588\u2591\u2588\u2588\u2588\u2591\u2588\u2588\u2588\u2591\u2588\u2588\u2588\u2591\u2588\u2588\u2588\u2591\u2588\u2588\u2588\u2591\u2588\u2588\u2588", labelColor: "#1d4ed8", valueColor: "#86efac" },
  ];

  return (
    <div style={{ display: "flex", gap: 16, fontFamily: "monospace", fontSize: 12.5, lineHeight: "1.6", marginBottom: 8 }}>
      <pre style={{ margin: 0, flexShrink: 0, color: "#1d6fe8", fontWeight: "bold" }}>
        {logoLines.map((line, i) => (
          <span key={i}>{line}{"\n"}</span>
        ))}
      </pre>
      <div style={{ paddingTop: 8 }}>
        {info.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 12 }}>
            {row.label && (
              <span style={{ color: row.labelColor, fontWeight: 600, minWidth: 70 }}>{row.label}</span>
            )}
            {(row.value || row.label === "") && (
              <span style={{ color: row.valueColor }}>
                {row.suffix ? (
                  <><span style={{ color: "#60a5fa", fontWeight: 700 }}>{row.value}</span><span style={{ color: row.suffixColor }}>@arch</span></>
                ) : row.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CMATRIX COMPONENT ───────────────────────────── */
function CMatrix({ onDone }) {
  const canvasRef = useRef(null);
  const timerRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Make canvas responsive to its container
    canvas.width  = canvas.clientWidth || 520;
    canvas.height = canvas.clientHeight || 200;
    const ctx    = canvas.getContext("2d");
    const W      = canvas.width;
    const H      = canvas.height;
    const cols   = Math.floor(W / 14);
    const drops  = Array(cols).fill(1);
    const chars  = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

    let frame;
    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "13px monospace";

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x    = i * 14;
        ctx.fillStyle = y === 1 ? "#ffffff" : `hsl(${120 + Math.random() * 20}, 100%, ${45 + Math.random() * 30}%)`;
        ctx.fillText(char, x, y * 14);
        if (y * 14 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      frame = requestAnimationFrame(draw);
    }
    draw();

    timerRef.current = setTimeout(() => {
      cancelAnimationFrame(frame);
      onDone && onDone();
    }, 5000);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timerRef.current);
    };
  }, [onDone]);

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} style={{ display: "block", borderRadius: 4, width: "100%", height: "200px" }} />
      <div style={{ position: "absolute", bottom: 8, right: 8, color: "rgba(74,222,128,0.5)", fontSize: 11, fontFamily: "monospace" }}>
        press q to quit (or wait 5s)
      </div>
    </div>
  );
}

/* ── TTY-CLOCK COMPONENT ─────────────────────────── */
function TtyClock({ onDone }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    const t  = setTimeout(() => { clearInterval(iv); onDone && onDone(); }, 8000);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [onDone]);

  const pad = n => String(n).padStart(2, "0");
  const segments = {
    "0": ["███","█ █","█ █","█ █","███"],
    "1": ["  █","  █","  █","  █","  █"],
    "2": ["███","  █","███","█  ","███"],
    "3": ["███","  █","███","  █","███"],
    "4": ["█ █","█ █","███","  █","  █"],
    "5": ["███","█  ","███","  █","███"],
    "6": ["███","█  ","███","█ █","███"],
    "7": ["███","  █","  █","  █","  █"],
    "8": ["███","█ █","███","█ █","███"],
    "9": ["███","█ █","███","  █","███"],
    ":": ["   "," ░ ","   "," ░ ","   "],
  };

  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
  const rows = [0, 1, 2, 3, 4].map(row =>
    timeStr.split("").map(ch => (segments[ch] || ["   ","   ","   ","   ","   "])[row]).join("  ")
  );

  return (
    <div style={{ padding: "12px 0" }}>
      <pre style={{ color: "#4ade80", fontFamily: "monospace", fontSize: 14, lineHeight: "1.4", letterSpacing: 2 }}>
        {rows.join("\n")}
      </pre>
      <div style={{ color: "rgba(74,222,128,0.45)", fontSize: 11, fontFamily: "monospace", marginTop: 8 }}>
        {time.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        {"  •  auto-quit in 8s"}
      </div>
    </div>
  );
}

/* ── CAVA COMPONENT ──────────────────────────────── */
function Cava({ onDone }) {
  const [bars, setBars] = useState(Array(32).fill(0));

  useEffect(() => {
    const iv = setInterval(() => {
      setBars(prev => prev.map(b => {
        const target = Math.random() * 16;
        return b + (target - b) * 0.4;
      }));
    }, 80);
    const t = setTimeout(() => { clearInterval(iv); onDone && onDone(); }, 8000);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [onDone]);

  const rows = Array(16).fill(null).map((_, row) =>
    bars.map(b => Math.round(b) >= (16 - row) ? "█" : " ").join("")
  );

  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ color: "rgba(74,222,128,0.4)", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>
        Chopin - Nocturne op.9 No.2 ♪
      </div>
      <pre style={{ color: "#22c55e", fontFamily: "monospace", fontSize: 11, lineHeight: "1.15", letterSpacing: 4 }}>
        {rows.join("\n")}
      </pre>
      <div style={{ color: "rgba(74,222,128,0.45)", fontSize: 11, fontFamily: "monospace", marginTop: 6 }}>
        auto-quit in 8s
      </div>
    </div>
  );
}

/* ── RENDER LINE ─────────────────────────────────── */
function RenderLine({ line }) {
  if (!line || line.t === "special") return null;

  if (line.t === "fastfetch") return <FastfetchOutput />;
  if (line.t === "cmatrix")   return <CMatrix />;
  if (line.t === "ttyclock")  return <TtyClock />;
  if (line.t === "cava")      return <Cava />;

  if (line.t === "divider") return (
    <div style={{ color: "#166534", fontFamily: "monospace", fontSize: 13 }}>{"─".repeat(48)}</div>
  );
  if (line.t === "header") return (
    <div style={{ color: "#4ade80", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>{line.v}</div>
  );
  if (line.t === "label") return (
    <div style={{ color: "#86efac", fontFamily: "monospace", fontSize: 12, marginTop: 4, opacity: 0.7 }}>[ {line.v} ]</div>
  );
  if (line.t === "bar") {
    const filled = Math.round(line.v.pct / 100 * 20);
    const bar    = "█".repeat(filled) + "░".repeat(20 - filled);
    return (
      <div style={{ fontFamily: "monospace", fontSize: 12.5, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ color: "#86efac", minWidth: 180 }}>{line.v.name}</span>
        <span style={{ color: "#22c55e" }}>{bar}</span>
        <span style={{ color: "#4ade80", minWidth: 36 }}>{line.v.pct}%</span>
      </div>
    );
  }
  if (line.t === "cols") return (
    <div>
      {line.v.map(([k, v], i) => (
        <div key={i} style={{ fontFamily: "monospace", fontSize: 12.5, display: "flex", gap: 12 }}>
          <span style={{ color: "#4ade80", minWidth: 140 }}>{k}</span>
          <span style={{ color: "#86efac" }}>{v}</span>
        </div>
      ))}
    </div>
  );
  if (line.t === "project") {
    const statusColor = line.v.status === "released" ? "#22c55e" : "#facc15";
    return (
      <div style={{ fontFamily: "monospace", fontSize: 12.5, marginBottom: 4 }}>
        <span style={{ color: "#4ade80" }}>{line.v.name}</span>
        <span style={{ color: "#166534" }}> [{line.v.tech}] </span>
        <span style={{ color: statusColor, fontSize: 11 }}>[{line.v.status}]</span>
        <div style={{ color: "#86efac", paddingLeft: 16, opacity: 0.7, fontSize: 12 }}>{line.v.desc}</div>
      </div>
    );
  }
  if (line.t === "green") return <div style={{ color: "#22c55e", fontFamily: "monospace", fontSize: 13, whiteSpace: "pre-wrap" }}>{line.v}</div>;
  if (line.t === "red")   return <div style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 13, whiteSpace: "pre-wrap" }}>{line.v}</div>;
  if (line.t === "muted") return <div style={{ color: "#166534", fontFamily: "monospace", fontSize: 12.5, opacity: 0.8, whiteSpace: "pre-wrap" }}>{line.v}</div>;

  return <div style={{ color: "#86efac", fontFamily: "monospace", fontSize: 13, whiteSpace: "pre-wrap" }}>{line.v ?? ""}</div>;
}

/* ── INPUT LINE ──────────────────────────────────── */
function InputLine({ cwd, onSubmit }) {
  const [val, setVal] = useState("");
  const inputRef      = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      const trimmed = val.trim();
      onSubmit(trimmed);
      setVal("");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", fontFamily: "monospace", fontSize: 13, marginTop: 4 }}>
      <span style={{ color: "#4ade80", flexShrink: 0, whiteSpace: "nowrap" }}>
        <span style={{ color: "#22c55e" }}>pathih</span>
        <span style={{ color: "#86efac" }}>@arch</span>
        <span style={{ color: "#166534" }}>:</span>
        <span style={{ color: "#4ade80" }}>{cwd}</span>
        <span style={{ color: "#86efac" }}>$ </span>
      </span>
      <input
        ref={inputRef}
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={handleKey}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#86efac",
          fontFamily: "monospace",
          fontSize: 13,
          flex: 1,
          caretColor: "#4ade80",
        }}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}


export default function Terminal() {
  const [entries, setEntries] = useState([
    { type: "output", lines: [
      { t: "green", v: "PathihOS v2.6.0 — Arch Linux (portfolio edition)" },
      { t: "muted", v: 'Type "help" to see available commands.' },
      { t: "text",  v: "" },
    ]},
  ]);
  const [cwd,          setCwd]          = useState("~");
  const [cwdFull,      setCwdFull]      = useState("/home/pathih");
  const [history,      setHistory]      = useState([]);
  const [activeSpecial,setActiveSpecial]= useState(null);
  const scrollRef = useRef(null);
  const termRef   = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, activeSpecial]);

  const resolvePath = useCallback((target) => {
    if (!target || target === "~") return "/home/pathih";
    if (target.startsWith("/"))    return target;
    if (target === "..") {
      const parts = cwdFull.split("/").filter(Boolean);
      parts.pop();
      return "/" + parts.join("/") || "/";
    }
    return (cwdFull === "/" ? "" : cwdFull) + "/" + target;
  }, [cwdFull]);

  const pushOutput = useCallback((lines) => {
    setEntries(prev => [...prev, { type: "output", lines }]);
  }, []);

  const runCommand = useCallback((raw) => {
    if (!raw) return;
    const trimmed = raw.trim();
    const lower   = trimmed.toLowerCase();

    setHistory(h => [...h, trimmed]);

    setEntries(prev => [...prev, { type: "prompt", text: trimmed, cwd }]);

    if (lower === "clear") { setEntries([]); return; }

    const egg = EASTER_EGGS[lower];
    if (egg) { pushOutput(egg); return; }

    if (COMMANDS[lower]) {
      pushOutput(COMMANDS[lower]({ history }));
      return;
    }

    if (lower === "fastfetch" || lower === "neofetch") {
      setEntries(prev => [...prev, { type: "fastfetch", id: Date.now() }]);
      return;
    }
    if (lower === "cmatrix")                           { setActiveSpecial("cmatrix");   return; }
    if (lower === "tty-clock" || lower === "ttyclock") { setActiveSpecial("ttyclock");  return; }
    if (lower === "cava")                              { setActiveSpecial("cava");      return; }
    if (lower === "matrix")                            { setActiveSpecial("cmatrix");   return; }

    if (lower === "pwd") { pushOutput([{ t: "green", v: cwdFull }]); return; }

    if (lower === "ls" || lower.startsWith("ls ")) {
      const arg   = trimmed.slice(3).trim();
      const path  = arg ? resolvePath(arg) : cwdFull;
      const items = FS[path];
      if (!items) { pushOutput([{ t: "red", v: `ls: cannot access '${arg || path}': No such file or directory` }]); return; }
      pushOutput(items.map(i => ({ t: "green", v: i })));
      return;
    }

    if (lower === "cd" || lower.startsWith("cd ")) {
      const arg  = trimmed.slice(3).trim();
      if (!arg || arg === "~") { setCwdFull("/home/pathih"); setCwd("~"); return; }
      const path = resolvePath(arg);
      if (FS[path] !== undefined) {
        setCwdFull(path);
        setCwd(path.replace("/home/pathih", "~") || "/");
      } else {
        pushOutput([{ t: "red", v: `cd: no such file or directory: ${arg}` }]);
      }
      return;
    }

    if (lower.startsWith("cat ")) {
      const arg     = trimmed.slice(4).trim();
      const fullArg = arg.startsWith("/") ? arg : (cwdFull === "/" ? "" : cwdFull) + "/" + arg;
      const content = FILE_CONTENTS[fullArg];
      if (content) {
        pushOutput(content.split("\n").map(l => ({ t: "green", v: l })));
      } else {
        pushOutput([{ t: "red", v: `cat: ${arg}: No such file or directory` }]);
      }
      return;
    }

    pushOutput([
      { t: "red",   v: `bash: ${trimmed}: command not found` },
      { t: "muted", v: 'type "help" for available commands' },
    ]);
  }, [cwd, cwdFull, history, pushOutput, resolvePath]);

  const handleSpecialDone = useCallback(() => {
    const type = activeSpecial;
    if (!type) return;
    setActiveSpecial(null);
    setEntries(prev => [...prev, { type: "output", lines: [{ t: "muted", v: `${type} terminated` }] }]);
  }, [activeSpecial]);

  return (
    <section className="page-section terminal-section">
      <div className="container">
        <div className="section-header">
          <h2>Terminal</h2>
          <p className="section-subtitle">Interactive Arch Linux simulation</p>
        </div>

        <div
          ref={termRef}
          className="terminal-window"
          onClick={() => termRef.current?.querySelector("input")?.focus()}
        >
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green-dot" />
            </div>
            <span className="terminal-title">pathih@arch: {cwd}</span>
          </div>

          <div className="terminal-body">
            {entries.map((entry, i) => {
              if (entry.type === "prompt") return (
                <div key={i} style={{ fontFamily: "monospace", fontSize: 13, marginBottom: 2 }}>
                  <span style={{ color: "#22c55e" }}>pathih</span>
                  <span style={{ color: "#86efac" }}>@arch</span>
                  <span style={{ color: "#166534" }}>:</span>
                  <span style={{ color: "#4ade80" }}>{entry.cwd}</span>
                  <span style={{ color: "#86efac" }}>$ </span>
                  <span style={{ color: "#d1fae5" }}>{entry.text}</span>
                </div>
              );
              if (entry.type === "fastfetch") return <FastfetchOutput key={i} />;
              return (
                <div key={i} style={{ marginBottom: 2 }}>
                  {entry.lines.map((line, j) => <RenderLine key={j} line={line} />)}
                </div>
              );
            })}

            {activeSpecial === "cmatrix"  && <CMatrix  onDone={handleSpecialDone} />}
            {activeSpecial === "ttyclock" && <TtyClock onDone={handleSpecialDone} />}
            {activeSpecial === "cava"     && <Cava     onDone={handleSpecialDone} />}

            {!activeSpecial && <InputLine cwd={cwd} onSubmit={runCommand} />}

            <div ref={scrollRef} />
          </div>
        </div>

        <p className="terminal-hint">
          Click the terminal and type. Try:{" "}
          <code>help</code>, <code>fastfetch</code>, <code>cmatrix</code>, <code>ls</code>, <code>projects</code>, <code>konami</code>
        </p>
      </div>
    </section>
  );
}
