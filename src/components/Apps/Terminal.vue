<template>
  <div class="terminal-app">
    <div class="terminal-content" ref="terminalContent">
      
      <!-- Welcome ASCII Art -->
      <div class="welcome-section" v-if="showWelcome">
        <pre class="ascii-art">{{ asciiArt }}</pre>
      </div>

      <!-- Command History -->
      <div class="command-history">
        <div 
          v-for="(entry, index) in commandHistory" 
          :key="index" 
          class="command-entry"
        >
          <div class="command-line">
            <span class="prompt">{{ entry.prompt }}</span>
            <span class="command">{{ entry.command }}</span>
            <span v-if="isTypingCommand && index === commandHistory.length - 1" class="typing-cursor">_</span>
          </div>
          <div v-if="entry.output && entry.output.type === 'component'" class="command-output">
            <component :is="entry.output.component" v-bind="entry.output.props" />
          </div>
          <div v-else-if="entry.output" class="command-output" v-html="formatOutput(entry.output)" />
        </div>
      </div>

      <!-- Current Input Line -->
      <div v-if="showRealInput" class="input-line">
        <span class="prompt">{{ currentPrompt }}</span>
        <input 
          v-model="currentCommand"
          @keyup.enter="executeCommand"
          @keydown.tab.prevent="autocomplete"
          @keyup.up="previousCommand"
          @keyup.down="nextCommand"
          ref="commandInput"
          class="command-input"
          :placeholder="isGUIMode ? 'Escribe un comando o usa los botones...' : 'Escribe help para ver comandos disponibles...'"
        >
      </div>

      <!-- Quick Action Buttons (GUI Mode) -->
      <div v-if="isGUIMode && showRealInput" class="quick-actions">
        <button @click="executeQuickCommand('ls')" class="quick-btn">
          📁 Explorar
        </button>
        <button @click="executeQuickCommand('cat about.txt')" class="quick-btn">
          👤 Sobre Mí
        </button>
        <button @click="executeQuickCommand('ls projects/')" class="quick-btn">
          💼 Proyectos
        </button>
        <button @click="executeQuickCommand('cat skills.json')" class="quick-btn">
          🛠️ Skills
        </button>
        <button @click="executeQuickCommand('mail')" class="quick-btn">
          📧 Contacto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HelpPanel from '../HelpPanel.vue'

export default {
  name: 'Terminal',
  components: {
    HelpPanel
  },
  inject: {
    registerApp: { default: null },
    unregisterApp: { default: null }
  },
  data() {
    return {
      appInfo: {
        id: 'terminal',
        name: 'Terminal',
        icon: '💻',
        component: 'Terminal',
        props: {},
        canClose: false,  // La terminal no se puede cerrar
        width: '600px',
        initialX: 50,
        initialY: 20
      },
      showWelcome: true,
      isGUIMode: true,
      currentCommand: '',
      currentPrompt: 'laura@dev-portfolio:~$',
      currentPath: '~',
      commandHistory: [],
      commandHistoryIndex: -1,
      isTypingCommand: false,
      showRealInput: false,
      initialized: false,

      asciiArt: `
 ██▓     ▄▄▄       █    ██  ██▀███   ▄▄▄       ▒█████    ██████ 
▓██▒    ▒████▄     ██  ▓██▒▓██ ▒ ██▒▒████▄    ▒██▒  ██▒▒██    ▒ 
▒██░    ▒██  ▀█▄  ▓██  ▒██░▓██ ░▄█ ▒▒██  ▀█▄  ▒██░  ██▒░ ▓██▄   
▒██░    ░██▄▄▄▄██ ▓▓█  ░██░▒██▀▀█▄  ░██▄▄▄▄██ ▒██   ██░  ▒   ██▒
░██████▒ ▓█   ▓██▒▒▒█████▓ ░██▓ ▒██▒ ▓█   ▓██▒░ ████▓▒░▒██████▒▒
░ ▒░▓  ░ ▒▒   ▓▒█░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░
░ ░ ▒  ░  ▒   ▒▒ ░░░▒░ ░ ░   ░▒ ░ ▒░  ▒   ▒▒ ░  ░ ▒ ▒░ ░ ░▒  ░ ░
  ░ ░     ░   ▒    ░░░ ░ ░   ░░   ░   ░   ▒   ░ ░ ░ ▒  ░  ░  ░  
    ░  ░      ░  ░   ░        ░           ░  ░    ░ ░        ░  `,

      welcomeMessage: '¡Bienvenidos a mi portfolio digital! 👩‍💻\nSoy Laura, Backend Developer con interés en DevOps, IA y Frontend.\nEscribe "help" para ver comandos disponibles o usa los botones. 🚀',

      availableCommands: [
        { name: 'ls [path]', description: 'Lista archivos y directorios' },
        { name: 'cd <path>', description: 'Cambia de directorio' },
        { name: 'cat <file>', description: 'Muestra el contenido de un archivo' },
        { name: 'pwd', description: 'Muestra el directorio actual' },
        { name: 'whoami', description: 'Información sobre mí' },
        { name: 'ps aux', description: 'Muestra mis skills/tecnologías' },
        { name: 'history', description: 'Historial de comandos' },
        { name: 'clear', description: 'Limpia la pantalla' },
        { name: 'mail', description: 'Abrir formulario de contacto' },
        { name: 'tree', description: 'Estructura del portfolio' },
        { name: 'about', description: 'Resumen completo sobre mí' },
        { name: 'welcome', description: 'Mensaje de bienvenida a la web' }
      ],
      
      fileSystem: {
        '~': {
          type: 'directory',
          contents: {
            'about.txt': {
              type: 'file',
              content: `
      === SOBRE MÍ ===

      👤 Nombre: Laura
      🎯 Profesión: Backend Developer
      🌟 Especialidades: Python, DevOps, IA, Frontend

      📍 Ubicación: España
      💼 Estado: Trabajando en SoftwareOne
      🎓 Formación: Universidad de A Coruña, pero en constante aprendizaje

      🔧 Backend: Python, APIs REST, Bases de datos
      🚀 DevOps: Docker, CI/CD, Cloud
      🤖 IA: Machine Learning, análisis de datos, LLMs
      🎨 Frontend: JavaScript, Alpine.js, Angular, Vue.js (¡aprendiendo!)

      💡 Me apasiona resolver problemas complejos y crear soluciones elegantes.
      🌱 Siempre en búsqueda de nuevos desafíos y tecnologías.
            `
            },
            'skills.json': {
              type: 'file',
              content: JSON.stringify({
                backend: { python: 90, apis: 85, databases: 80 },
                devops: { docker: 85, ci_cd: 80, cloud: 75 },
                ai: { machine_learning: 50, data_analysis: 65, llms: 60 },
                frontend: { vue_js: 70, javascript: 75, css: 70 }
              }, null, 2)
            },
            'projects': {
              type: 'directory',
              contents: {
                'ai-chatbot.py': { type: 'file', executable: true },
                'api-microservice.py': { type: 'file', executable: true },
                'devops-pipeline.yml': { type: 'file' },
                'vue-portfolio.js': { type: 'file', executable: true }
              }
            },
            'contact.sh': {
              type: 'file',
              executable: true,
              content: 'script para contactar'
            }
          }
        }
      }
    }
  },

  mounted() {
    // Auto-registrar la app en el sistema
    if (this.registerApp) {
      this.registerApp(this.appInfo);
    }
    
    this.addInitialCommands();
  },

  beforeUnmount() {
    // Des-registrar la app al desmontar
    if (this.unregisterApp) {
      this.unregisterApp(this.appInfo.id);
    }
  },

  methods: {
    addInitialCommands() {
      if (this.initialized) return;
      
      this.commandHistory.push({
        prompt: 'laura@dev-portfolio:~$',
        command: '',
        output: ''
      });
      this.scrollToBottom();
      
      this.isTypingCommand = true;
      
      const command = 'welcome';
      let i = 0;
      const typeCommand = () => {
        if (i < command.length) {
          this.commandHistory[this.commandHistory.length - 1].command = command.substring(0, i + 1);
          i++;
          setTimeout(typeCommand, 120);
        } else {
          this.isTypingCommand = false;
          
          setTimeout(() => {
            this.commandHistory[this.commandHistory.length - 1].output = this.executeWelcome();
            this.scrollToBottom();
            
            setTimeout(() => {
              this.showRealInput = true;
              this.focusInput();
            }, 800);
          }, 300);
        }
      };
      
      setTimeout(typeCommand, 600);
    },

    executeWelcome() {
      const containerId = 'welcome-typing-' + Date.now();
      
      let welcomeHTML = `
        <div class="welcome-output">
          <div id="${containerId}" class="typing-welcome"></div>
        </div>
      `;
      
      setTimeout(() => {
        this.typeWelcomeInOutput(containerId);
      }, 100);
      
      return welcomeHTML;
    },
    
    typeWelcomeInOutput(containerId) {
      let i = 0;
      const speed = 10;
      let typedText = '';
      
      const typeWriter = () => {
        if (i < this.welcomeMessage.length) {
          typedText += this.welcomeMessage.charAt(i);
          const element = document.getElementById(containerId);
          if (element) {
            element.innerHTML = `<span style="color: #00ff88;">${typedText.replace(/\n/g, '<br>')}</span>`;
          }
          i++;
          setTimeout(typeWriter, speed);
        } else {
          if (!this.initialized) {
            setTimeout(() => {
              this.showRealInput = true;
              this.focusInput();
            }, 800);
            this.initialized = true;
          }
        }
      };
      
      typeWriter();
    },

    executeCommand() {
      if (!this.currentCommand.trim()) return;

      const command = this.currentCommand.trim();
      this.commandHistory.push({
        prompt: this.currentPrompt,
        command: command,
        output: this.processCommand(command)
      });

      this.currentCommand = '';
      this.commandHistoryIndex = -1;
      this.scrollToBottom();
    },

    executeQuickCommand(command) {
      this.currentCommand = command;
      this.executeCommand();
    },

    processCommand(command) {
      const parts = command.split(' ');
      const cmd = parts[0];
      const args = parts.slice(1);

      switch (cmd) {
        case 'ls':
          return this.listDirectory(args[0] || this.currentPath);
        case 'cat':
          return this.showFileContent(args[0]);
        case 'cd':
          return this.changeDirectory(args[0]);
        case 'pwd':
          return this.currentPath;
        case 'whoami':
          return 'laura\nBackend Developer | DevOps Enthusiast | IA Explorer | Frontend Beginner';
        case 'clear':
          this.commandHistory = [];
          return '';
        case 'help':
          return {
            type: 'component',
            component: 'HelpPanel',
            props: { availableCommands: this.availableCommands }
          };
        case 'ps':
          return this.showProcesses();
        case 'neofetch':
        case 'about':
          return this.executeNeofetch();
        case 'tree':
          return this.showTree();
        case 'history':
          return this.showHistory();
        case 'mail':
          this.$emit('navigate-to', 'contact');
          return 'Abriendo formulario de contacto... 📧';
        case 'welcome':
          return this.executeWelcome();
        default:
          return `bash: ${cmd}: command not found\nEscribe 'help' para ver comandos disponibles.`;
      }
    },

    listDirectory(path = this.currentPath) {
      const dir = this.getDirectory(path);
      if (!dir) return `ls: cannot access '${path}': No such file or directory`;

      let output = '';
      for (const [name, item] of Object.entries(dir.contents)) {
        const prefix = item.type === 'directory' ? 'd' : '-';
        const executable = item.executable ? '*' : ' ';
        const color = item.type === 'directory' ? 'blue' : (item.executable ? 'green' : 'white');
        output += `${prefix}rwxr-xr-x 1 laura laura 4096 Nov 14 2025 <span style="color: ${color}">${name}${executable}</span>\n`;
      }
      return output;
    },

    showFileContent(filename) {
      if (!filename) return 'cat: missing file operand';

      const file = this.getFile(filename);
      if (!file) return `cat: ${filename}: No such file or directory`;
      if (file.type === 'directory') return `cat: ${filename}: Is a directory`;

      return file.content || `Content of ${filename}`;
    },

    executeNeofetch() {
      return `<div class="system-info">
<span style="color: #00ff88; font-weight: bold;">╭─ LAURA DEV PORTFOLIO ─────────────────────────────────────╮</span>
<span style="color: #00ff88;">│</span> <span style="color: #ffbd2e;">👤 Desarrolladora:</span> <span style="color: #fff;">Laura</span>                                    <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">│</span> <span style="color: #ffbd2e;">🎯 Especialidad:</span>  <span style="color: #fff;">Backend Developer</span>                        <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">│</span> <span style="color: #ffbd2e;">📍 Ubicación:</span>     <span style="color: #fff;">España</span>                                   <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">│</span> <span style="color: #ffbd2e;">💼 Estado:</span>        <span style="color: #4caf50;">Disponible para proyectos</span>             <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">├─ STACK PRINCIPAL ─────────────────────────────────────────┤</span>
<span style="color: #00ff88;">│</span> <span style="color: #007bff;">🐍 Backend:</span>       <span style="color: #fff;">Python, Django, FastAPI, PostgreSQL</span>     <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">│</span> <span style="color: #007bff;">🚀 DevOps:</span>        <span style="color: #fff;">Docker, GitHub Actions, CI/CD, AWS</span>       <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">│</span> <span style="color: #007bff;">🤖 IA & Data:</span>     <span style="color: #fff;">Machine Learning, Data Analysis, LLMs</span>   <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">│</span> <span style="color: #007bff;">🎨 Frontend:</span>      <span style="color: #fff;">Vue.js, JavaScript, CSS (aprendiendo!)</span>  <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">├─ EXPERIENCIA ─────────────────────────────────────────────┤</span>
<span style="color: #00ff88;">│</span> <span style="color: #ff9800;">🎓 Formación:</span>        <span style="color: #fff;">Autodidacta y en constante aprendizaje</span> <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">│</span> <span style="color: #ff9800;">🔥 Pasión:</span>           <span style="color: #fff;">Resolver problemas complejos</span>           <span style="color: #00ff88;">│</span>
<span style="color: #00ff88;">╰───────────────────────────────────────────────────────────╯</span>

<span style="color: #888; font-style: italic;">💡 Tip: Usa 'cat about.txt' para más detalles o 'ps aux' para ver skills</span>
</div>`;
    },

    showProcesses() {
      return `
    USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME  COMMAND
    laura     1001 85.2  15.3  2048  1024 pts/0    R+   09:00   2:30  python
    laura     1002 75.0  12.1  1536   768 pts/1    S    09:15   1:45  docker
    laura     1003 68.3  10.2  1280   512 pts/2    S    09:30   1:20  vue
    laura     1004 45.1   8.4  1024   256 pts/3    S    10:00   0:45  devops
    laura     1005 32.7   6.1   768   128 pts/4    S    10:30   0:30  ai-ml
      `;
    },

    showTree() {
      return `
    📁 laura@dev-portfolio:~
    ├── 📄 about.txt
    ├── 📄 skills.json
    ├── 📄 contact.sh*
    └── 📁 projects/
        ├── 🐍 ai-chatbot.py*
        ├── 🐍 api-microservice.py*
        ├── 📄 devops-pipeline.yml
        └── 🟨 vue-portfolio.js*

    1 directory, 6 files
      `;
    },

    showHistory() {
      return this.commandHistory.map((entry, index) => 
        `${index + 1}  ${entry.command}`
      ).join('\n');
    },

    changeDirectory(path) {
      if (!path) {
        this.currentPath = '~';
        this.currentPrompt = 'laura@dev-portfolio:~$';
        return '';
      }

      let targetPath = path;
      
      if (path === '..') {
        if (this.currentPath === '~') {
          return 'cd: ..: Permission denied';
        }
        this.currentPath = '~';
        this.currentPrompt = 'laura@dev-portfolio:~$';
        return '';
      }
      
      if (path === '.') {
        return '';
      }
      
      if (!path.startsWith('~') && !path.startsWith('/')) {
        targetPath = `~/${path}`;
      }
      
      targetPath = targetPath.replace(/\/$/, '');
      
      const dir = this.getDirectory(targetPath);
      
      if (!dir) {
        return `cd: ${path}: No such file or directory`;
      }
      
      if (dir.type !== 'directory') {
        return `cd: ${path}: Not a directory`;
      }
      
      this.currentPath = targetPath;
      
      const displayPath = targetPath === '~' ? '~' : targetPath.replace('~/', '~/');
      this.currentPrompt = `laura@dev-portfolio:${displayPath}$`;
      
      return '';
    },

    getDirectory(path) { 
      if (!path || path === '~') {
        return this.fileSystem['~'];
      }
      
      if (!path.startsWith('~')) {
        path = `~/${path}`;
      }
      
      path = path.replace(/\/$/, '');
      
      if (path === '~') {
        return this.fileSystem['~'];
      }
      
      const parts = path.split('/');
      if (parts[0] === '~' && parts.length === 2) {
        const dirName = parts[1];
        const homeContents = this.fileSystem['~'].contents;
        if (homeContents[dirName] && homeContents[dirName].type === 'directory') {
          return homeContents[dirName];
        }
      }
      
      return null;
    },

    getFile(filename) {
      const currentDir = this.getDirectory(this.currentPath);
      return currentDir?.contents?.[filename];
    },

    autocomplete() {
      const commands = this.availableCommands.map(cmd => cmd.name.split(' ')[0]);
      const matches = commands.filter(cmd => cmd.startsWith(this.currentCommand));
      if (matches.length === 1) {
        this.currentCommand = matches[0];
      }
    },

    previousCommand() {
      if (this.commandHistoryIndex < this.commandHistory.length - 1) {
        this.commandHistoryIndex++;
        this.currentCommand = this.commandHistory[this.commandHistory.length - 1 - this.commandHistoryIndex].command;
      }
    },

    nextCommand() {
      if (this.commandHistoryIndex > 0) {
        this.commandHistoryIndex--;
        this.currentCommand = this.commandHistory[this.commandHistory.length - 1 - this.commandHistoryIndex].command;
      } else if (this.commandHistoryIndex === 0) {
        this.commandHistoryIndex = -1;
        this.currentCommand = '';
      }
    },

    focusInput() {
      this.$nextTick(() => { 
        this.$refs.commandInput?.focus(); 
      });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const content = this.$refs.terminalContent;
        if (content) {
          content.scrollTop = content.scrollHeight;
        }
      });
    },
    
    formatOutput(output) {
      if (typeof output === 'string' && (
          output.trim().startsWith('<div') ||
          output.trim().startsWith('<pre')
        )) {
        return output;
      }
      return output.replace(/\n/g, '<br>');
    }
  }
}
</script>

<style scoped>
.terminal-app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.terminal-content {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  background: #0a0a0a;
}

.ascii-art {
  color: #00ff88;
  font-size: 12px;
  line-height: 1.2;
  margin-bottom: 20px;
  text-align: center;
}

.command-history {
  margin-bottom: 20px;
}

.command-entry {
  margin-bottom: 15px;
}

.command-line {
  color: #fff;
  margin-bottom: 5px !important;
}

.prompt {
  color: #00ff88;
  user-select: none;
}

.command {
  color: #ffbd2e;
  margin-left: 5px !important;
}

.typing-cursor {
  color: #00ff88;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.command-output {
  color: #ccc;
  margin: 20px 0 !important;
  font-family: inherit;
  line-height: 1.4;
}

.input-line {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.command-input {
  background: transparent;
  border: none;
  color: #ffbd2e;
  font-family: inherit;
  font-size: 16px;
  outline: none;
  flex: 1;
  margin-left: 5px !important;
}

.command-input::placeholder {
  color: #666;
}

.quick-actions {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 20px 0;
  padding: 15px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 6px;
}

.quick-btn {
  flex: 1 1 0;
  width: 100%;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  transition: all 0.3s;
  text-align: center;
}

.quick-btn:hover {
  background: rgba(0, 255, 136, 0.2);
  transform: translateY(-1px);
}

.neofetch, .system-info {
  font-family: monospace;
  font-size: 11px;
  line-height: 1.4;
  background: rgba(0, 255, 136, 0.03);
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid #00ff88;
}

.welcome-output {
  margin: 0;
}

.typing-welcome {
  color: #00ff88;
  line-height: 1.4;
}

/* Scrollbar personalizada */
.terminal-content::-webkit-scrollbar {
  width: 8px;
}

.terminal-content::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.terminal-content::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.terminal-content::-webkit-scrollbar-thumb:hover {
  background: #666;
}

@media (max-width: 768px) {
  .terminal-content {
    padding: 10px;
  }
  
  .ascii-art {
    font-size: 8px;
  }
  
  .quick-actions {
    flex-direction: column;
  }
}
</style>
