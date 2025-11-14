<template>
  <div class="terminal-portfolio">
    <div class="terminal-window">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="btn-close"></span>
          <span class="btn-minimize"></span>
          <span class="btn-maximize"></span>
        </div>
        <div class="terminal-title">laura@dev-portfolio: ~</div>
        <div class="terminal-actions">
          <button @click="toggleHelp" class="help-btn">❓</button>
          <button @click="toggleGUIMode" class="gui-btn">
            {{ isGUIMode ? '💻' : '🖱️' }}
          </button>
        </div>
      </div>

      <!-- Terminal Content -->
      <div class="terminal-content" ref="terminalContent">
        <!-- Welcome ASCII Art -->
        <div class="welcome-section" v-if="showWelcome">
          <pre class="ascii-art">{{ asciiArt }}</pre>
          <div class="welcome-text">
            <p class="typing-text">{{ typedWelcome }}</p>
          </div>
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
            </div>
            <div v-if="entry.output" class="command-output" v-html="entry.output"></div>
          </div>
        </div>

        <!-- Current Input Line -->
        <div class="input-line">
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
        <div v-if="isGUIMode" class="quick-actions">
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

        <!-- Help Panel -->
        <div v-if="showHelp" class="help-panel">
          <h3>📖 Comandos Disponibles:</h3>
          <div class="help-commands">
            <div v-for="cmd in availableCommands" :key="cmd.name" class="help-item">
              <code>{{ cmd.name }}</code> - {{ cmd.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TerminalPortfolio',
  data() {
    return {
      showWelcome: true,
      isGUIMode: true,
      showHelp: false,
      currentCommand: '',
      currentPrompt: 'laura@dev-portfolio:~$',
      currentPath: '~',
      commandHistory: [],
      commandHistoryIndex: -1,
      typedWelcome: '',
      
      asciiArt: `
 ██▓     ▄▄▄       █    ██  ██▀███   ▄▄▄      
▓██▒    ▒████▄     ██  ▓██▒▓██ ▒ ██▒▒████▄    
▒██░    ▒██  ▀█▄  ▓██  ▒██░▓██ ░▄█ ▒▒██  ▀█▄  
▒██░    ░██▄▄▄▄██ ▓▓█  ░██░▒██▀▀█▄  ░██▄▄▄▄██ 
░██████▒ ▓█   ▓██▒▒▒█████▓ ░██▓ ▒██▒ ▓█   ▓██▒
░ ▒░▓  ░ ▒▒   ▓▒█░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░
░ ░ ▒  ░  ▒   ▒▒ ░░░▒░ ░ ░   ░▒ ░ ▒░  ▒   ▒▒ ░
  ░ ░     ░   ▒    ░░░ ░ ░   ░░   ░   ░   ▒   
    ░  ░      ░  ░   ░        ░           ░  ░
      `,

      welcomeMessage: 'Bienvenida/o a mi portfolio digital! 👩‍💻\nSoy Laura, Backend Developer con pasión por DevOps, IA y Frontend.\nEscribe "help" para ver comandos disponibles o usa los botones. 🚀',

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
        { name: 'neofetch', description: 'Info del sistema (sobre mí)' }
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
💼 Estado: Disponible para proyectos
🎓 Formación: Autodidacta y en constante aprendizaje

🔧 Backend: Python, APIs REST, Bases de datos
🚀 DevOps: Docker, CI/CD, Cloud
🤖 IA: Machine Learning, análisis de datos
🎨 Frontend: Vue.js, JavaScript, CSS (¡aprendiendo!)

💡 Me apasiona resolver problemas complejos y crear soluciones elegantes.
🌱 Siempre en búsqueda de nuevos desafíos y tecnologías.
              `
            },
            'skills.json': {
              type: 'file',
              content: JSON.stringify({
                backend: {
                  python: 90,
                  apis: 85,
                  databases: 80
                },
                devops: {
                  docker: 85,
                  ci_cd: 80,
                  cloud: 75
                },
                ai: {
                  machine_learning: 80,
                  data_analysis: 75
                },
                frontend: {
                  vue_js: 70,
                  javascript: 75,
                  css: 70
                }
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
    this.typeWelcomeMessage()
    this.focusInput()
    this.addInitialCommands()
  },

  methods: {
    typeWelcomeMessage() {
      let i = 0
      const speed = 30
      const typeWriter = () => {
        if (i < this.welcomeMessage.length) {
          this.typedWelcome += this.welcomeMessage.charAt(i)
          i++
          setTimeout(typeWriter, speed)
        }
      }
      setTimeout(typeWriter, 1000)
    },

    addInitialCommands() {
      setTimeout(() => {
        this.commandHistory.push({
          prompt: 'laura@dev-portfolio:~$',
          command: 'neofetch',
          output: this.executeNeofetch()
        })
        this.scrollToBottom()
      }, 3000)
    },

    executeCommand() {
      if (!this.currentCommand.trim()) return

      const command = this.currentCommand.trim()
      this.commandHistory.push({
        prompt: this.currentPrompt,
        command: command,
        output: this.processCommand(command)
      })

      this.currentCommand = ''
      this.commandHistoryIndex = -1
      this.scrollToBottom()
    },

    executeQuickCommand(command) {
      this.currentCommand = command
      this.executeCommand()
    },

    processCommand(command) {
      const parts = command.split(' ')
      const cmd = parts[0]
      const args = parts.slice(1)

      switch (cmd) {
        case 'ls':
          return this.listDirectory(args[0] || this.currentPath)
        case 'cat':
          return this.showFileContent(args[0])
        case 'cd':
          return this.changeDirectory(args[0])
        case 'pwd':
          return this.currentPath
        case 'whoami':
          return 'laura\nBackend Developer | DevOps Enthusiast | IA Explorer'
        case 'clear':
          this.commandHistory = []
          return ''
        case 'help':
          return this.showHelp()
        case 'ps':
          return this.showProcesses()
        case 'neofetch':
          return this.executeNeofetch()
        case 'tree':
          return this.showTree()
        case 'history':
          return this.showHistory()
        case 'mail':
          this.$emit('navigate-to', 'contact')
          return 'Abriendo formulario de contacto... 📧'
        default:
          return `bash: ${cmd}: command not found\nEscribe 'help' para ver comandos disponibles.`
      }
    },

    listDirectory(path = this.currentPath) {
      const dir = this.getDirectory(path)
      if (!dir) return `ls: cannot access '${path}': No such file or directory`

      let output = ''
      for (const [name, item] of Object.entries(dir.contents)) {
        const prefix = item.type === 'directory' ? 'd' : '-'
        const executable = item.executable ? '*' : ' '
        const color = item.type === 'directory' ? 'blue' : (item.executable ? 'green' : 'white')
        output += `${prefix}rwxr-xr-x 1 laura laura 4096 Nov 14 2025 <span style="color: ${color}">${name}${executable}</span>\n`
      }
      return output
    },

    showFileContent(filename) {
      if (!filename) return 'cat: missing file operand'
      
      const file = this.getFile(filename)
      if (!file) return `cat: ${filename}: No such file or directory`
      
      if (file.type === 'directory') return `cat: ${filename}: Is a directory`
      
      return file.content || `Content of ${filename}`
    },

    executeNeofetch() {
      return `
<div class="neofetch">
<span style="color: #61dafb">                    -\`               </span><span style="color: #98d8c8"> laura@dev-portfolio</span>
<span style="color: #61dafb">                   .o+\`               </span><span style="color: #98d8c8"> ──────────────────────</span>
<span style="color: #61dafb">                  \`ooo/               </span><span style="color: #98d8c8"> OS:</span> Portfolio Linux
<span style="color: #61dafb">                 \`+oooo:              </span><span style="color: #98d8c8"> Host:</span> Backend Developer
<span style="color: #61dafb">                \`+oooooo:             </span><span style="color: #98d8c8"> Kernel:</span> Python 3.11
<span style="color: #61dafb">                -+oooooo+:            </span><span style="color: #98d8c8"> Uptime:</span> 5+ años coding
<span style="color: #61dafb">              \`/:-:++oooo+:           </span><span style="color: #98d8c8"> Packages:</span> Docker, FastAPI, Vue
<span style="color: #61dafb">             \`/++++/+++++++:          </span><span style="color: #98d8c8"> Shell:</span> zsh, bash
<span style="color: #61dafb">            \`/++++++++++++++:         </span><span style="color: #98d8c8"> IDE:</span> VS Code
<span style="color: #61dafb">           \`/+++ooooooooooooo/\`       </span><span style="color: #98d8c8"> CPU:</span> Problem Solver
<span style="color: #61dafb">          ./ooosssso++osssssso+\`      </span><span style="color: #98d8c8"> GPU:</span> Creative Thinking
<span style="color: #61dafb">         .oossssso-\`\`\`\`/ossssss+\`     </span><span style="color: #98d8c8"> Memory:</span> ∞ curiosidad
</div>`
    },

    showProcesses() {
      return `
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
laura     1001 85.2  15.3  2048  1024 pts/0    R+   09:00   2:30 python
laura     1002 75.0  12.1  1536   768 pts/1    S    09:15   1:45 docker
laura     1003 68.3  10.2  1280   512 pts/2    S    09:30   1:20 vue
laura     1004 45.1   8.4  1024   256 pts/3    S    10:00   0:45 devops
laura     1005 32.7   6.1   768   128 pts/4    S    10:30   0:30 ai-ml
      `
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
      `
    },

    showHistory() {
      return this.commandHistory.map((entry, index) => 
        `${index + 1}  ${entry.command}`
      ).join('\n')
    },

    getDirectory(path) {
      // Simplificado para el ejemplo
      return this.fileSystem[path] || this.fileSystem['~']
    },

    getFile(filename) {
      const currentDir = this.getDirectory(this.currentPath)
      return currentDir?.contents?.[filename]
    },

    autocomplete() {
      // Implementar autocompletado básico
      const commands = this.availableCommands.map(cmd => cmd.name.split(' ')[0])
      const matches = commands.filter(cmd => cmd.startsWith(this.currentCommand))
      if (matches.length === 1) {
        this.currentCommand = matches[0]
      }
    },

    previousCommand() {
      if (this.commandHistoryIndex < this.commandHistory.length - 1) {
        this.commandHistoryIndex++
        this.currentCommand = this.commandHistory[this.commandHistory.length - 1 - this.commandHistoryIndex].command
      }
    },

    nextCommand() {
      if (this.commandHistoryIndex > 0) {
        this.commandHistoryIndex--
        this.currentCommand = this.commandHistory[this.commandHistory.length - 1 - this.commandHistoryIndex].command
      } else if (this.commandHistoryIndex === 0) {
        this.commandHistoryIndex = -1
        this.currentCommand = ''
      }
    },

    toggleHelp() {
      this.showHelp = !this.showHelp
    },

    toggleGUIMode() {
      this.isGUIMode = !this.isGUIMode
    },

    focusInput() {
      this.$nextTick(() => {
        this.$refs.commandInput?.focus()
      })
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const content = this.$refs.terminalContent
        content.scrollTop = content.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
.terminal-portfolio {
  min-height: 100vh;
  background: #0a0a0a;
  font-family: 'Fira Code', 'Courier New', monospace;
  padding: 20px;
}

.terminal-window {
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 255, 0, 0.1);
  border: 1px solid #333;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.terminal-header {
  background: #2d2d2d;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #444;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.btn-close { background: #ff5f57; }
.btn-minimize { background: #ffbd2e; }
.btn-maximize { background: #28ca42; }

.terminal-title {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.terminal-actions {
  display: flex;
  gap: 10px;
}

.help-btn, .gui-btn {
  background: none;
  border: none;
  color: #00ff88;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.help-btn:hover, .gui-btn:hover {
  background: rgba(0, 255, 136, 0.1);
}

.terminal-content {
  padding: 20px;
  max-height: 80vh;
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

.welcome-text {
  color: #888;
  margin-bottom: 30px;
  white-space: pre-line;
  line-height: 1.6;
}

.typing-text {
  color: #00ff88;
}

.command-history {
  margin-bottom: 20px;
}

.command-entry {
  margin-bottom: 15px;
}

.command-line {
  color: #fff;
  margin-bottom: 5px;
}

.prompt {
  color: #00ff88;
  user-select: none;
}

.command {
  color: #ffbd2e;
  margin-left: 5px;
}

.command-output {
  color: #ccc;
  margin-left: 0;
  white-space: pre-line;
  font-family: inherit;
  line-height: 1.4;
}

.input-line {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.command-input {
  background: transparent;
  border: none;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  flex: 1;
  margin-left: 5px;
}

.command-input::placeholder {
  color: #666;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
  padding: 15px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 6px;
}

.quick-btn {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: #00ff88;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  transition: all 0.3s;
}

.quick-btn:hover {
  background: rgba(0, 255, 136, 0.2);
  transform: translateY(-1px);
}

.help-panel {
  background: rgba(0, 123, 255, 0.05);
  border: 1px solid rgba(0, 123, 255, 0.2);
  border-radius: 6px;
  padding: 15px;
  margin: 20px 0;
}

.help-panel h3 {
  color: #007bff;
  margin-bottom: 10px;
  font-size: 16px;
}

.help-commands {
  display: grid;
  gap: 8px;
}

.help-item {
  color: #ccc;
  font-size: 13px;
}

.help-item code {
  color: #ffbd2e;
  background: rgba(255, 189, 46, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: inherit;
}

.neofetch {
  font-family: monospace;
  font-size: 11px;
  line-height: 1.2;
}

/* Responsive */
@media (max-width: 768px) {
  .terminal-portfolio {
    padding: 10px;
  }
  
  .ascii-art {
    font-size: 8px;
  }
  
  .quick-actions {
    flex-direction: column;
  }
  
  .terminal-content {
    max-height: 70vh;
  }
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
</style>
