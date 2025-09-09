import { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "../components/ContactForm";
import typeText from "../utils/typeText";

const availableCommands = [
  "help", "about", "skills", "education", "projects", "contact", "clear"
];

const FORMSPREE_URL = "https://formspree.io/f/your-formspree-id";

const useCommandHandler = ({ githubApiUrl, terminalRef, inputRef }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    fetchProjects();
    typeText(["Welcome to my portfolio!", "Type 'help' to get started."], "text-green-400", true, setOutput, setIsTyping);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [output, isTyping, showContactForm]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(githubApiUrl, {
        params: { sort: "updated", direction: "desc" },
      });
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      typeText(["Error: Failed to load projects from GitHub."], "text-red-400", false, setOutput, setIsTyping);
    }
  };

  const handleCommand = (command) => {
    const args = command.trim().split(" ");
    const cmd = args[0];

    if (command && !isTyping) {
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    }

    switch (cmd) {
      case "clear":
        setOutput([]);
        typeText(["Welcome to my portfolio!", "Type 'help' to get started."], "text-green-400", true, setOutput, setIsTyping);
        break;

      case "help":
        typeText([
          "Available commands:",
          "   help:      Show this help message",
          "   about:     Learn about me",
          "   skills:    List my technical skills",
          "   education: View my education history",
          "   projects:  List my GitHub projects",
          "   contact:   Get in touch with me",
          "   clear:     Clear the terminal screen"
        ], "text-green-400", false, setOutput, setIsTyping);
        break;

      case "about":
        typeText([
          "Merhaba, ben Mete Yıldırım...",
          "Yazılım dünyasına katkıda bulunmak istiyorum.",
        ], "text-green-400", false, setOutput, setIsTyping);
        break;

      case "skills":
        typeText([
          "Masaüstü Geliştirme", "- C#, Java, Guna, Swing, JavaFX",
          "Ön Yüz Geliştirme", "- HTML/CSS, JavaScript, Bootstrap, React, Tailwind CSS",
          "Veritabanları", "- SQL Server, MySQL, EntityFramework",
          "Takım Çalışması", "- Git, GitHub"
        ], "text-green-400", false, setOutput, setIsTyping);
        break;

      case "education":
        typeText([
          "2024-2027: Tekirdağ Namık Kemal Üniversitesi (3.07)",
          "2023-2024: Çankırı Karatekin Üniversitesi (3.27)"
        ], "text-green-400", false, setOutput, setIsTyping);
        break;

      case "projects":
        if (projects.length > 0) {
          const projectLines = projects.flatMap((proj) => [
            `> ${proj.name}`,
            `   - ${proj.description || "No description provided."}`,
            `   - Diller: ${proj.language || "Belirtilmemiş"}`,
            `   - Repo: ${proj.html_url}`,
            `   - `,
            ""
          ]);
          typeText(projectLines, "text-green-400", false, setOutput, setIsTyping);
        } else {
          typeText(["No projects found."], "text-yellow-400", false, setOutput, setIsTyping);
        }
        break;

      case "contact":
        typeText(["Mesaj için formdaki tüm boş alanları doldurun."], "text-green-400", false, setOutput, setIsTyping)
          .then(() => setShowContactForm(true));
        break;

      default:
        typeText([`Error: '${command}' command not found.`], "text-red-400", false, setOutput, setIsTyping);
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (isTyping || showContactForm) return;

    switch (e.key) {
      case "Enter":
        const command = input.trim();
        setInput("");
        handleCommand(command);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
          setHistoryIndex(newIndex);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
          setHistoryIndex(newIndex);
        } else if (historyIndex === 0) {
          setInput("");
          setHistoryIndex(-1);
        }
        break;
      case "Tab":
        e.preventDefault();
        const matches = availableCommands.filter((cmd) => cmd.startsWith(input.trim()));
        if (matches.length === 1) {
          setInput(matches[0]);
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleButtonClick = (cmd) => {
    if (!isTyping) {
      setInput(cmd);
      handleCommand(cmd);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    typeText(["Mesajınız gönderiliyor..."], "text-gray-400", false, setOutput, setIsTyping);

    try {
      await axios.post(FORMSPREE_URL, data, { headers: { Accept: "application/json" } });
      typeText(["Mesajınız başarıyla gönderildi. Teşekkürler!"], "text-green-400", false, setOutput, setIsTyping);
    } catch {
      typeText(["Hata: Mesaj gönderilemedi."], "text-red-400", false, setOutput, setIsTyping);
    } finally {
      setShowContactForm(false);
      setIsTyping(false);
      e.target.reset();
    }
  };

  const filteredSuggestions = availableCommands.filter(
    (cmd) => cmd.startsWith(input.trim()) && cmd !== input.trim()
  );

  return {
    input,
    setInput,
    output,
    isTyping,
    showContactForm,
    handleKeyDown,
    handleInputChange,
    handleButtonClick,
    contactFormHandlers: { handleFormSubmit },
    filteredSuggestions,
    ContactForm: <ContactForm onSubmit={handleFormSubmit} isTyping={isTyping} />
  };
};

export default useCommandHandler;
