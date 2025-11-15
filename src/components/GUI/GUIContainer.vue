<template>
  <div class="gui-container">
    <!-- Mensaje cuando no hay apps abiertas -->
    <div v-if="openApps.length === 0" class="no-apps-message">
      <div class="empty-state">
        <span class="icon">🖥️</span>
        <p>No hay aplicaciones abiertas</p>
        <p class="hint">Usa comandos como <code>open status</code> para abrir apps</p>
      </div>
    </div>

    <!-- Apps abiertas -->
    <div v-else class="apps-container">
      <div 
        v-for="app in openApps" 
        :key="app.id"
        class="app-wrapper"
      >
        <!-- Header de la app con título y botón cerrar -->
        <div class="app-header">
          <span class="app-icon">{{ app.icon }}</span>
          <span class="app-title">{{ app.name }}</span>
          <button 
            @click="$emit('close-app', app.id)" 
            class="close-btn"
            :title="`Cerrar ${app.name}`"
          >
            ✕
          </button>
        </div>
        
        <!-- Contenido de la app (componente dinámico) -->
        <div class="app-content">
          <component :is="app.component" v-bind="app.props" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeCounter from './TimeCounter.vue'
import TechStackTreemap from './TechStackTreemap.vue'
import SystemStatus from './SystemStatus.vue'
import CurrentStatus from './CurrentStatus.vue'

export default {
  name: 'GUIContainer',
  components: {
    TimeCounter,
    TechStackTreemap,
    SystemStatus,
    CurrentStatus
  },
  props: {
    openApps: {
      type: Array,
      default: () => [
        {
          id: 'timer',
          name: 'Experiencia profesional',
          icon: '⌚',
          component: 'TimeCounter',
          props: {}
        }, 
        {
          id: 'status',
          name: 'Estado del sistema',
          icon: '📊',
          component: 'SystemStatus',
          props: {} // props opcionales para el componente
        }
      ]
    }
  },
  emits: ['close-app']
}
</script>

<style scoped>
.gui-container {
  background: #111;
  border-left: 2px solid #333;
  padding: 20px;
  overflow-y: auto;
  flex-shrink: 0;
  height: 100%;
}

/* Estado vacío */
.no-apps-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-state .icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 8px 0;
  font-size: 14px;
}

.empty-state .hint {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 12px;
}

.empty-state code {
  background: rgba(0, 255, 136, 0.1);
  color: var(--primary-color);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Fira Code', monospace;
}

/* Contenedor de apps */
.apps-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 0px !important;
}

/* Wrapper de cada app */
.app-wrapper {
  background: var(--widget-background);
  border: var(--widget-border);
  border-radius: var(--widget-border-radius);
  overflow: hidden;
  box-shadow: var(--widget-shadow);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header de la app */
.app-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #1e1e1e;
  border-bottom: 1px solid var(--border-color);
}

.app-icon {
  font-size: 18px;
}

.app-title {
  flex: 1;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.2s;
  line-height: 1;
}

.close-btn:hover {
  background: rgba(255, 95, 87, 0.2);
  color: #ff5f57;
}

/* Contenido de la app */
.app-content {
  padding: 0;
}

/* Responsive */
@media (max-width: 1200px) {  
  .gui-container {
    width: 100% !important;
    height: auto;
    border-left: none;
    border-top: 2px solid #333;
    overflow-y: auto;
  }
}

@media (max-width: 768px) {
  .gui-container {
    padding: 10px;
    max-height: 40vh;
  }
  
  .apps-container {
    gap: 12px;
  }
  
  .app-header {
    padding: 10px 12px;
  }
}

/* Scrollbar personalizada */
.gui-container::-webkit-scrollbar {
  width: 8px;
}

.gui-container::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.gui-container::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.gui-container::-webkit-scrollbar-thumb:hover {
  background: #666;
}
</style>