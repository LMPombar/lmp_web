<template>
  <div class="terminal-portfolio">
    <!-- Main Layout: Two Columns -->
    <div class="terminal-layout">
      
      <!-- Left Column: Interactive Terminal -->
      <div class="terminal-column">
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

      <!-- Right Column: Status Dashboard -->
      <div class="status-column">
        <!-- Experience Counter -->
        <TimeCounter />

        <!-- Tech Stack -->
        <div class="status-widget tech-widget">
          <h3 class="widget-title">🛠️ Tech Stack</h3>
          <div class="tech-categories">
            <div v-for="(category, categoryName) in techStack" :key="categoryName" class="tech-category">
              <h4 class="category-title">{{ category.title }}</h4>
              <div class="tech-items">
                <div 
                  v-for="tech in category.items" 
                  :key="tech.name"
                  class="tech-item"
                  :style="{ '--skill-level': tech.level + '%' }"
                >
                  <span class="tech-icon">{{ tech.icon }}</span>
                  <span class="tech-name">{{ tech.name }}</span>
                  <div class="tech-bar">
                    <div class="tech-progress"></div>
                  </div>
                  <span class="tech-level">{{ tech.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Status -->
        <div class="status-widget system-widget">
          <h3 class="widget-title">⚡ Sistema</h3>
          <div class="system-stats">
            <div class="stat-item">
              <span class="stat-label">CPU (Problem Solving)</span>
              <div class="stat-bar">
                <div class="stat-progress" :style="{ width: systemStats.cpu + '%' }"></div>
              </div>
              <span class="stat-value">{{ systemStats.cpu }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Memory (Curiosidad)</span>
              <div class="stat-bar">
                <div class="stat-progress" :style="{ width: systemStats.memory + '%' }"></div>
              </div>
              <span class="stat-value">{{ systemStats.memory }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Creativity Engine</span>
              <div class="stat-bar">
                <div class="stat-progress" :style="{ width: systemStats.creativity + '%' }"></div>
              </div>
              <span class="stat-value">{{ systemStats.creativity }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Learning Rate</span>
              <div class="stat-bar">
                <div class="stat-progress" :style="{ width: systemStats.learning + '%' }"></div>
              </div>
              <span class="stat-value">{{ systemStats.learning }}%</span>
            </div>
          </div>
        </div>

        <!-- Current Status -->
        <div class="status-widget current-status-widget">
          <h3 class="widget-title">🔄 Estado Actual</h3>
          <div class="status-items">
            <div class="status-item">
              <span class="status-indicator available"></span>
              <span class="status-text">Disponible para proyectos</span>
            </div>
            <div class="status-item">
              <span class="status-indicator learning"></span>
              <span class="status-text">Aprendiendo Vue.js</span>
            </div>
            <div class="status-item">
              <span class="status-indicator building"></span>
              <span class="status-text">Construyendo portfolio</span>
            </div>
          </div>
          <div class="last-activity">
            Última actividad: {{ lastActivity }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import TimeCounter from './TimeCounter.vue'

export default {
  name: 'TerminalPortfolio',
  components: {
    TimeCounter
  },
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
      
      // System stats (dynamic)
      systemStats: {
        cpu: 85,
        memory: 92,
        creativity: 95,
        learning: 88
      },
      
      // Tech Stack
      techStack: {
        backend: {
          title: 'Backend',
          items: [
            { name: 'Python', icon: '🐍', level: 90 },
            { name: 'FastAPI', icon: '⚡', level: 85 },
            { name: 'PostgreSQL', icon: '🐘', level: 80 },
            { name: 'Redis', icon: '🔴', level: 75 }
          ]
        },
        devops: {
          title: 'DevOps',
          items: [
            { name: 'Docker', icon: '🐳', level: 85 },
            { name: 'Kubernetes', icon: '☸️', level: 70 },
            { name: 'CI/CD', icon: '🔄', level: 80 },
            { name: 'AWS', icon: '☁️', level: 75 }
          ]
        },
        ai: {
          title: 'IA & Data',
          items: [
            { name: 'Machine Learning', icon: '🤖', level: 80 },
            { name: 'TensorFlow', icon: '🧠', level: 75 },
            { name: 'Data Analysis', icon: '📊', level: 85 },
            { name: 'Python ML', icon: '🔬', level: 82 }
          ]
        },
        frontend: {
          title: 'Frontend',
          items: [
            { name: 'Vue.js', icon: '💚', level: 70 },
            { name: 'JavaScript', icon: '🟨', level: 75 },
            { name: 'CSS3', icon: '💙', level: 70 },
            { name: 'HTML5', icon: '🧡', level: 90 }
          ]
        }
      },
      
      lastActivity: 'Desarrollando terminal portfolio',
      
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
    this.startSystemStatsAnimation()
  },

  methods: {
    typeWelcomeMessage() {
      let i = 0
      const speed = 10
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
    },

    // System stats animation
    startSystemStatsAnimation() {
      setInterval(() => {
        // Simulate dynamic system stats
        this.systemStats.cpu = Math.max(70, Math.min(95, this.systemStats.cpu + (Math.random() - 0.5) * 10))
        this.systemStats.memory = Math.max(85, Math.min(98, this.systemStats.memory + (Math.random() - 0.5) * 5))
        this.systemStats.creativity = Math.max(90, Math.min(99, this.systemStats.creativity + (Math.random() - 0.5) * 3))
        this.systemStats.learning = Math.max(80, Math.min(95, this.systemStats.learning + (Math.random() - 0.5) * 8))
      }, 5000) // Update every 5 seconds
    }
  }
}
</script>

<style scoped>
.terminal-portfolio {
  min-height: 100vh;
  background: #0a0a0a;
  font-family: 'Fira Code', 'Courier New', monospace;
  padding: 0;
  overflow: hidden;
}

.terminal-layout {
  display: flex;
  height: 100vh;
  gap: 0;
}

/* Left Column - Terminal */
.terminal-column {
  flex: 1;
  min-width: 0;
  padding: 20px;
}

.terminal-window {
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 255, 0, 0.1);
  border: 1px solid #333;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  background: #2d2d2d;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #444;
  flex-shrink: 0;
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

/* Right Column - Status Dashboard */
.status-column {
  width: 400px;
  background: #111;
  border-left: 2px solid #333;
  padding: 20px;
  overflow-y: auto;
  flex-shrink: 0;
}

.status-widget {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.widget-title {
  color: #00ff88;
  font-size: 16px;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
}

/* Tech Widget */
.tech-categories {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tech-category {
  background: rgba(0, 123, 255, 0.05);
  border: 1px solid rgba(0, 123, 255, 0.2);
  border-radius: 6px;
  padding: 12px;
}

.category-title {
  color: #007bff;
  font-size: 14px;
  margin-bottom: 10px;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.tech-name {
  color: #ccc;
  font-size: 12px;
  min-width: 80px;
}

.tech-bar {
  flex: 1;
  height: 4px;
  background: #333;
  border-radius: 2px;
  overflow: hidden;
}

.tech-progress {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #00ff88);
  width: var(--skill-level);
  border-radius: 2px;
  transition: width 2s ease;
}

.tech-level {
  color: #888;
  font-size: 10px;
  min-width: 35px;
  text-align: right;
}

/* System Widget */
.system-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-label {
  color: #ccc;
  font-size: 12px;
  min-width: 120px;
}

.stat-bar {
  flex: 1;
  height: 6px;
  background: #333;
  border-radius: 3px;
  overflow: hidden;
}

.stat-progress {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
  border-radius: 3px;
  transition: width 1s ease;
}

.stat-value {
  color: #00ff88;
  font-size: 11px;
  min-width: 35px;
  text-align: right;
}

/* Current Status Widget */
.status-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-indicator.available {
  background: #4caf50;
  animation: pulse-green 2s infinite;
}

.status-indicator.learning {
  background: #2196f3;
  animation: pulse-blue 2s infinite;
}

.status-indicator.building {
  background: #ff9800;
  animation: pulse-orange 2s infinite;
}

.status-text {
  color: #ccc;
  font-size: 12px;
}

.last-activity {
  color: #666;
  font-size: 11px;
  font-style: italic;
  text-align: center;
}

/* Animations */
@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7); }
  70% { box-shadow: 0 0 0 5px rgba(76, 175, 80, 0); }
}

@keyframes pulse-blue {
  0%, 100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7); }
  70% { box-shadow: 0 0 0 5px rgba(33, 150, 243, 0); }
}

@keyframes pulse-orange {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7); }
  70% { box-shadow: 0 0 0 5px rgba(255, 152, 0, 0); }
}

/* Responsive */
@media (max-width: 1200px) {
  .terminal-layout {
    flex-direction: column;
    height: auto;
  }
  
  .status-column {
    width: 100%;
    order: -1;
    max-height: 50vh;
  }
  
  .terminal-column {
    min-height: 50vh;
  }
}

@media (max-width: 768px) {
  .terminal-portfolio {
    padding: 0;
  }
  
  .terminal-column {
    padding: 10px;
  }
  
  .status-column {
    padding: 10px;
  }
  
  .ascii-art {
    font-size: 8px;
  }
  
  .quick-actions {
    flex-direction: column;
  }
  
  .experience-counter {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  
  .experience-number {
    font-size: 18px;
  }
}

/* Scrollbar personalizada */
.terminal-content::-webkit-scrollbar,
.status-column::-webkit-scrollbar {
  width: 8px;
}

.terminal-content::-webkit-scrollbar-track,
.status-column::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.terminal-content::-webkit-scrollbar-thumb,
.status-column::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.terminal-content::-webkit-scrollbar-thumb:hover,
.status-column::-webkit-scrollbar-thumb:hover {
  background: #666;
}
</style>
