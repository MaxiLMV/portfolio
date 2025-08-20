import React, { useState, useEffect } from "react";

export default function Portfolio() {
  const [projects] = useState([
    {
      id: 5,
      title: "RAG NVIDIA PDF API",
      year: "2025",
      duration: "Less than a day",
      category: "Backend / API",
      image: "/images/RAG.png",
      details: [
        "Chunked an NVIDIA PDF into sentences and structured table data for context processing.",
        "Generated embeddings with `sentence-transformers` and stored them in a ChromaDB vector store.",
        "Used a local LLM (Ollama `deepseek-r1:8b`) to answer user queries based on retrieved context.",
        "Exposed a Flask `/ask` API that returns both the answer and the source chunks.",
        "Automated testing with Pytest covering different question scenarios."
      ],
      tech: ["Python", "Flask", "ChromaDB", "sentence-transformers", "Ollama", "pytest", "pdfplumber", "spacy", "requests"],
      repo: "https://github.com/MaxiLMV/rag_task"
    },
    {
      id: 4,
      title: "Quantum Key Distribution (Thesis)",
      year: "2025",
      duration: "A week",
      category: "Simulation Console App",
      image: "/images/QKD.png",
      details: [
        "Implemented and analyzed several QKD protocols: BB84, BBM92, E91, and the Six-State protocol.",
        "Simulated quantum state transmission, error rates, and eavesdropping scenarios.",
        "Made unit tests for each simulation."
      ],
      tech: ["Python", "qiskit", "qiskit_aer", "pytest"],
      repo: "https://github.com/MaxiLMV/QKD_Thesis"
    },
    {
      id: 3,
      title: "3D Object Renderer",
      year: "2025",
      duration: "A week",
      category: "Desktop App",
      image: "/images/3d-renderer.png",
      details: [
        "Built a real-time 3D object renderer in C++ as part of a Computer Graphics assignment.",
        "Supports loading `.obj` models via Assimp and rendering.",
        "Has camera controls with 6-DOF movement (WASD + mouse).",
        "Integrated ImGui overlay for real-time adjustment of parameters (size, rotation, etc.).",
        "Has a very convenient Cinema-4D style object highlighting for selected objects."
      ],
      tech: ["C++", "Assimp", "OpenGL", "ImGui"],
      repo: "https://github.com/MaxiLMV/CG_Assignment2_79404"
    },
    {
      id: 2,
      title: "Custom Vigenère Cipher",
      year: "2024",
      duration: "About a week",
      category: "Desktop App",
      image: "/images/Vigenere.png",
      details: [
        "Developed a customizable Vigenère cipher encryption/decryption tool as a WPF desktop application.",
        "Supports both repeating-key and autokey variants of the Vigenère cipher.",
        "Allows user-defined alphabets with duplicate detection and validation.",
        "Provides flexible case-sensitivity options: maintain case, lowercase only, or strict mode.",
        "Includes options for handling non-alphabetic characters (include or ignore)."
      ],
      tech: ["C#", ".NET", "WPF"],
      repo: "https://github.com/MaxiLMV/CustomVigenereCypher"
    },
    {
      id: 1,
      title: "Convenience Store Manager",
      year: "2023",
      duration: "1 Month (Course Project)",
      category: "Desktop App",
      image: "/images/store-manager.png",
      details: [
        "Built in Java as a course assignment to simulate a convenience store management system.",
        "Implements object-oriented principles such as inheritance, encapsulation, and polymorphism.",
        "Includes features for managing inventory, processing sales, and tracking products.",
        "Developed during a month-long university project in Q2 2023.",
        "Currently non-functional due to the associated SQL database being offline."
      ],
      tech: ["Java", "SQL", "JBDC", "OOP", "Swing"],
      repo: "https://github.com/MaxiLMV/OOP_CW_TSI"
    }
  ]);

  const [openProject, setOpenProject] = useState(null);
  const [openAbout, setOpenAbout] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const asset = (p) => `${process.env.PUBLIC_URL}${p.startsWith("/") ? "" : "/"}${p}`;

  const CONTACT = {
    emails: ["pavlovskM@protonmail.com", "pavlovskij7@gmail.com"],
    phone: "+371 259 659 17",
    github: "https://github.com/MaxiLMV",
    linkedin: "https://www.linkedin.com/in/maksims-pavlovskis-7a826b214",
  };

  const cvUrl = process.env.PUBLIC_URL + "/MaksimsPavlovskis_CV.pdf";

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 1200);
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpenProject(null);
        setOpenAbout(false);
        setOpenContact(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const anyOpen = !!openProject || openAbout || openContact;
    document.body.style.overflow = anyOpen ? "hidden" : "";
  }, [openProject, openAbout, openContact]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-32" />
          <nav className="flex space-x-4">
            <button onClick={() => setOpenAbout(true)} className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">About</button>
            <a href="#projects" className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">Projects</a>
            <button onClick={() => setOpenContact(true)} className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white">Contact</button>
            <a href={cvUrl} download className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:brightness-95">Download CV</a>
          </nav>
        </div>
      </header>

      {/* Profile Section */}
      <section className="pt-32 pb-12 text-center">
        <img
          src={asset("/images/profile.jpg")}
          alt="Profile"
          className="w-64 h-64 mx-auto rounded-full border-4 border-gray-600 shadow-lg"
        />
        <h1 className="mt-6 text-4xl font-bold">Maksims Pavlovskis</h1>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-2 text-center">Projects</h2>
        <h4 className="text-sm text-gray-400 italic mb-8 text-center">You can click on these!</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenProject(p)}
              className="group relative aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-800 hover:scale-105 transform transition focus:outline-none">
              <img src={asset(p.image)} alt={p.title} className="w-full h-full object-contain bg-gray-900 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                <h2 className="text-lg font-semibold text-white">{p.title}</h2>
                <p className="text-sm text-gray-300">{p.year} – {p.duration}</p>
                <p className="text-xs text-gray-400">{p.category}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {openProject && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpenProject(null)} />
          <div className="relative z-50 w-full max-w-7xl bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              <div className="md:col-span-3 p-6 flex items-center justify-center">
                <img
                  src={asset(openProject.image)}
                  alt={openProject.title}
                  className="max-w-[70vw] max-h-[80vh] w-full h-auto object-contain rounded-lg"
                />
              </div>
              <div className="md:col-span-2 p-6 md:p-8 overflow-y-auto max-h-[85vh]">
                <h3 className="text-3xl font-bold mb-4">{openProject.title}</h3>
                {openProject.details.map((para, i) => (
                  <p key={i} className="mb-4 text-gray-300 leading-relaxed">{para}</p>
                ))}
                <div className="flex flex-wrap gap-2 mb-6">
                  {openProject.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-gray-700 text-sm">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={openProject.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:brightness-95"
                  >
                    View Repository
                  </a>
                  <button
                    onClick={() => setOpenProject(null)}
                    className="px-4 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {openAbout && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpenAbout(false)} />
          <div className="relative z-50 w-full max-w-3xl bg-gray-800 rounded-2xl shadow-xl overflow-auto max-h-[90vh] p-6 md:p-10">
            <div className="flex items-start gap-6">
              <img src={asset("/images/profile.jpg")} alt="Profile" className="w-28 h-28 rounded-full border-2 border-gray-600" />
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-2">About Me</h3>
                <p className="text-gray-300 mb-3">I'm a recent Computer Science & AI graduate (TSI & UWE) who enjoys building practical and diverse systems from graphics and tooling to NLP and quantum simulations.</p>
                <p className="text-gray-300 mb-3">I like clean code, measurable performance, and shipping small, testable slices. On the side: practicing prompt engineering, and experimenting with AI investments.</p>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Core tools</h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {['Python', 'TypeScript', 'C#', 'C++', 'React', 'R', 'Java', 'SQL'].map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-gray-700">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={() => setOpenAbout(false)} className="px-4 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-600">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {openContact && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpenContact(false)} />
          <div className="relative z-50 w-full max-w-xl bg-gray-800 rounded-2xl shadow-xl overflow-auto max-h-[90vh] p-6 md:p-8">
            {/* Copied toast */}
            {copiedToast && (
              <div className="absolute top-3 right-3 bg-gray-900/90 text-white text-xs px-3 py-2 rounded shadow" aria-live="polite">
                Copied to Clipboard!
              </div>
            )}

            <h3 className="text-3xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300 mb-4">Tap the buttons to copy. Social links open in a new tab.</p>
            <div className="space-y-3">
              {/* Email buttons */}
              {CONTACT.emails.map((em) => (
                <button
                  key={em}
                  onClick={() => copyToClipboard(em)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Click to copy"
                >
                  {em}
                </button>
              ))}

              {/* Phone button */}
              <button
                onClick={() => copyToClipboard(CONTACT.phone)}
                className="w-full text-left px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Click to copy"
              >
                {CONTACT.phone}
              </button>

              {/* Social links */}
              <a href={CONTACT.github} target="_blank" rel="noreferrer" className="block px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600">GitHub</a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="block px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600">LinkedIn</a>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setOpenContact(false)} className="px-4 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-600">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
