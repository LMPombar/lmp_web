<template>
  <div class="portfolio-os">
    <!-- OS Bar (Barra superior) -->
    <OSBar />
    
    <!-- Desktop Area - Todas las ventanas flotando aquí -->
    <div class="desktop-area">
      <!-- Todas las Apps (incluida Terminal) -->
      <OSWindow
        v-for="(app, index) in openApps"
        :key="app.id"
        v-show="!minimizedApps.includes(app.id)"
        :title="app.name"
        :icon="app.icon"
        :can-close="app.canClose !== false"
        :can-minimize="true"
        :can-maximize="true"
        :initial-x="app.initialX || getAppInitialX(index)"
        :initial-y="app.initialY || getAppInitialY(index)"
        :width="app.width || '400px'"
        :class="['app-window', `app-${app.id}`, { 
          active: app.id === activeAppId,
          'terminal-window': app.id === 'terminal'
        }]"
        @close="closeApp(app.id)"
        @minimize="minimizeApp(app.id)"
        @maximize="maximizeApp(app.id)"
        @focus="focusApp(app.id)"
      >
        <component :is="app.component" v-bind="app.props" />
      </OSWindow>
    </div>
    
    <!-- App Registry - Componentes ocultos para auto-registro -->
    <div style="display: none;">
      <Terminal />
      <TimeCounter />
      <SystemStatus />
      <!-- Añade aquí nuevas apps para que se auto-registren -->
    </div>
    
    <!-- Taskbar (Barra inferior) -->
    <Taskbar 
      :open-apps="openApps"
      :active-app-id="activeAppId"
      :minimized-apps="minimizedApps"
      :available-apps="availableApps"
      @focus-app="focusApp"
      @restore-app="restoreApp"
      @toggle-apps="toggleAppsMenu"
    />
  </div>
</template>

<script>
import HelpPanel from './HelpPanel.vue'
import OSBar from './OS/OSBar.vue'
import OSWindow from './OS/Window.vue'
import Taskbar from './OS/Taskbar.vue'
// App components
import Terminal from './Apps/Terminal.vue'
import TimeCounter from './Apps/TimeCounter.vue'
import SystemStatus from './Apps/SystemStatus.vue'
import TechStackTreemap from './Apps/TechStackTreemap.vue'
import CurrentStatus from './Apps/CurrentStatus.vue'

export default {
  name: 'PortfolioOS',
  components: { 
    HelpPanel,
    OSBar,
    OSWindow,
    Taskbar,
    Terminal,
    TimeCounter,
    SystemStatus,
    TechStackTreemap,
    CurrentStatus
  },
  data() {
    return {
      // OS state - Apps registradas dinámicamente
      availableApps: [], // Se llena automáticamente cuando las apps se montan
      openApps: [],
      minimizedApps: [],
      activeAppId: null
    }
  },

  computed: {
    // Aquí se pueden añadir computed properties si es necesario
  },

  provide() {
    return {
      registerApp: this.registerApp,
      unregisterApp: this.unregisterApp
    };
  },

  methods: {
    // App Registry Methods
    registerApp(appInfo) {
      // Verificar que no esté ya registrada
      if (!this.availableApps.find(app => app.id === appInfo.id)) {
        this.availableApps.push(appInfo);
        console.log(`📱 App registrada: ${appInfo.name} (${appInfo.id})`);
        
        // Auto-abrir la app cuando se registra (comportamiento inicial)
        if (!this.openApps.find(app => app.id === appInfo.id)) {
          this.openApps.push(appInfo);
        }
      }
    },
    
    unregisterApp(appId) {
      this.availableApps = this.availableApps.filter(app => app.id !== appId);
      this.openApps = this.openApps.filter(app => app.id !== appId);
      this.minimizedApps = this.minimizedApps.filter(id => id !== appId);
      console.log(`📱 App des-registrada: ${appId}`);
    },
    
    // Window Management Methods
    closeApp(appId) {
      this.openApps = this.openApps.filter(app => app.id !== appId);
      this.minimizedApps = this.minimizedApps.filter(id => id !== appId);
    },
    
    minimizeApp(appId) {
      console.log('🔽 Minimizando app:', appId);
      console.log('📋 openApps ANTES:', this.openApps.map(a => a.id));
      console.log('📋 minimizedApps ANTES:', this.minimizedApps);
      
      // Añadir a minimizados (usar spread para reactividad garantizada)
      if (!this.minimizedApps.includes(appId)) {
        this.minimizedApps = [...this.minimizedApps, appId];
      }
      
      // NO quitamos de openApps, solo la ocultamos con v-show
      
      console.log('📋 openApps DESPUÉS:', this.openApps.map(a => a.id));
      console.log('📋 minimizedApps DESPUÉS:', this.minimizedApps);
      
      // Si era la app activa, cambiar el foco a otra app NO minimizada
      if (this.activeAppId === appId) {
        const nonMinimizedApps = this.openApps.filter(app => !this.minimizedApps.includes(app.id));
        this.activeAppId = nonMinimizedApps.length > 0 ? nonMinimizedApps[0].id : null;
      }
    },
    
    restoreApp(appId) {
      console.log('🔼 Restaurando app:', appId);
      
      // Solo quitar de minimizados (la app ya está en openApps)
      this.minimizedApps = this.minimizedApps.filter(id => id !== appId);
      
      // Enfocar la app restaurada
      this.focusApp(appId);
    },
    
    maximizeApp(appId) {
      // TODO: Implementar maximizar
      console.log('Maximize app:', appId);
    },
    
    focusApp(appId) {
      this.activeAppId = appId;
      
      // Si está minimizada, restaurarla
      if (this.minimizedApps.includes(appId)) {
        this.restoreApp(appId);
      }
    },
    
    toggleAppsMenu() {
      // TODO: Aquí podríamos mostrar un menú con todas las apps disponibles
      console.log('Toggle apps menu');
    },
    
    // Window positioning
    getAppInitialX(index) {
      // Distribución horizontal equidistante
      // Terminal: 50px, TimeCounter: 450px, SystemStatus: 850px
      const positions = [50, 450, 850, 1250];
      return positions[index] || 50 + (index * 400);
    },
    
    getAppInitialY(index) {
      // Todas las ventanas a la misma altura para que se vean claramente
      const positions = [20, 20, 20, 20];
      return positions[index] || 20;
    }
  }
}
</script>

<style scoped>
.portfolio-os {
  height: 100vh;
  background: #0a0a0a;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 14px;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  
  /* CSS Variables - se heredan a los componentes hijos */
  --primary-color: #00ff88;
  --secondary-color: #007bff;
  --accent-color: #ffbd2e;
  --background-dark: #1a1a1a;
  --background-darker: #0a0a0a;
  --border-color: #333;
  --text-color: #ccc;
  --text-muted: #888;
  --text-bright: #fff;
  
  /* Widget styles */
  --widget-background: var(--background-dark);
  --widget-border: 1px solid var(--border-color);
  --widget-border-radius: 8px;
  --widget-padding: 20px;
  --widget-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  
  /* Title styles */
  --title-color: var(--primary-color);
  --title-size: 16px;
  --title-margin: 15px;
  --title-border: 1px solid var(--border-color);
}

.desktop-area {
  flex: 1;
  position: relative;
  overflow: hidden;
  margin-bottom: 50px; /* Espacio para la taskbar fija */
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}

/* App Windows - Se adaptan al contenido */
.app-window {
  max-height: calc(100vh - 120px);
  z-index: 1;
}

.app-window.active {
  z-index: 10 !important;
  box-shadow: 0 12px 40px rgba(0, 255, 136, 0.2);
}

.terminal-window {
  z-index: 2;
  min-height: 500px;
  max-height: calc(100vh - 120px);
}

/* Responsive */
@media (max-width: 1200px) {
  .terminal-window {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .portfolio-os {
    padding: 0;
  }
  
  .terminal-window {
    min-height: 300px;
  }
}
</style>
