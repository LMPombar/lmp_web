<template>
  <div class="taskbar">
    <div class="taskbar-apps">
      <button class="taskbar-btn" @click="$emit('toggle-apps')" title="Todas las apps">
        <span>📱</span>
      </button>

      <!-- Separador 1: Entre menú de apps y apps abiertas -->
      <div v-if="allApps.length > 0" class="taskbar-separator"></div>

      <button
        v-for="app in allApps"
        :key="app.id"
        :class="['taskbar-app', { active: app.id === activeAppId && !isMinimized(app.id), minimized: isMinimized(app.id) }]"
        @click="handleAppClick(app.id)"
        :title="isMinimized(app.id) ? `Restaurar ${app.name}` : app.name"
      >
        <span class="app-icon">{{ app.icon }}</span>
        <span class="app-name">{{ app.name }}</span>
        <span v-if="isMinimized(app.id)" class="minimized-indicator">─</span>
      </button>
    </div>
    
    <!-- Separador 2: Entre apps abiertas y sistema -->
    <div class="taskbar-separator"></div>
    
    <div class="taskbar-system">
      <!-- Contador de visitas globales -->
      <div class="visit-counter" :title="`Visitas globales a la web: ${visitCount}`">
        <span class="counter-icon">{{ isLoading ? 'Cargando visitas' : 'Visitas a la web:' }}</span>
        <span class="counter-value">{{ isLoading ? '...' : formatVisitCount(visitCount) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Taskbar',
  props: {
    openApps: {
      type: Array,
      default: () => []
    },
    activeAppId: {
      type: String,
      default: null
    },
    minimizedApps: {
      type: Array,
      default: () => []
    },
    availableApps: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visitCount: '---',
      isLoading: true
    }
  },
  computed: {
    allApps() {
      return this.openApps;
    }
  },
  emits: ['focus-app', 'restore-app', 'toggle-apps'],
  mounted() {
    this.initVisitCounter();
  },
  methods: {
    isMinimized(appId) {
      return this.minimizedApps.includes(appId);
    },
    handleAppClick(appId) {
      if (this.isMinimized(appId)) {
        // Si está minimizada, restaurar
        this.$emit('restore-app', appId);
      } else {
        // Si está abierta, hacer foco
        this.$emit('focus-app', appId);
      }
    },
    async initVisitCounter() {
      try {
        // Llamar a CountAPI para incrementar el contador global
        // Namespace: lmp-web | Key: visits
        const response = await fetch('https://api.countapi.xyz/hit/lmp-web/visits');
        
        if (!response.ok) {
          throw new Error('Error en la API');
        }
        
        const data = await response.json();
        this.visitCount = data.value;
        this.isLoading = false;
        
        console.log(`✅ Visita global #${this.visitCount} registrada`);
      } catch (error) {
        console.error('❌ Error al obtener visitas globales:', error);
        // Fallback a localStorage si falla la API
        const storedCount = localStorage.getItem('portfolio_visit_count_fallback');
        if (storedCount) {
          this.visitCount = parseInt(storedCount) + 1;
        } else {
          this.visitCount = 1;
        }
        localStorage.setItem('portfolio_visit_count_fallback', this.visitCount.toString());
        this.isLoading = false;
      }
    },
    formatVisitCount(count) {
      // Si es string (estado de carga o error), devolverlo tal cual
      if (typeof count === 'string') {
        return count;
      }
      
      // Formatear el número con separadores de miles para números grandes
      if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
      } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
      }
      return count.toString();
    }
  }
};
</script>

<style scoped>
.taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1e1e1e;
  border-top: 1px solid var(--border-color);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
}

.taskbar-apps {
  display: flex;
  gap: 8px;
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
}

.taskbar-app {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: var(--text-color);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  white-space: nowrap;
  font-size: 13px;
}

.taskbar-app:hover {
  background: rgba(0, 255, 136, 0.2);
  transform: translateY(-2px);
}

.taskbar-app.active {
  background: rgba(0, 255, 136, 0.3);
  border-color: var(--primary-color);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.taskbar-app.minimized {
  background: rgba(255, 189, 46, 0.1);
  border-color: rgba(255, 189, 46, 0.3);
  opacity: 0.7;
}

.taskbar-app.minimized:hover {
  background: rgba(255, 189, 46, 0.2);
  opacity: 1;
}

.minimized-indicator {
  font-size: 10px;
  color: var(--accent-color);
  margin-left: 4px;
}

.app-icon {
  font-size: 16px;
}

.app-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.taskbar-system {
  display: flex;
  gap: 8px;
}

/* Separador visual */
.taskbar-separator {
  width: 1px;
  height: 30px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--border-color) 20%,
    var(--border-color) 80%,
    transparent
  );
  margin: 0 4px;
  flex-shrink: 0;
}

.taskbar-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.taskbar-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
}

/* Contador de visitas */
.visit-counter {
  background: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.3);
  color: var(--text-color);
  padding: 3px 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  font-size: 13px;
  user-select: none;
  transition: all 0.3s;
}

.visit-counter:hover {
  background: rgba(0, 123, 255, 0.15);
  border-color: rgba(0, 123, 255, 0.4);
  opacity: 1;
}

.counter-icon {
  font-size: 8px;
  font-weight: 600;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 1;
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.counter-value {
  font-weight: 700;
  color: var(--secondary-color);
  min-width: 25px;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.2;
}

/* Scrollbar personalizada */
.taskbar-apps::-webkit-scrollbar {
  height: 4px;
}

.taskbar-apps::-webkit-scrollbar-track {
  background: transparent;
}

.taskbar-apps::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}

@media (max-width: 768px) {
  .taskbar {
    padding: 6px 8px;
    height: 45px;
  }
  
  .taskbar-app {
    padding: 4px 8px;
    font-size: 12px;
  }
  
  .app-name {
    display: none;
  }
  
  .visit-counter {
    padding: 4px 8px;
    font-size: 9px;
  }
  
  .counter-icon {
    font-size: 8px;
  }
  
  .counter-value {
    font-size: 13px;
  }
}
</style>
