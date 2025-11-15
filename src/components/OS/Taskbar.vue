<template>
  <div class="taskbar">
    <div class="taskbar-apps">
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
    
    <div class="taskbar-system">
      <button class="taskbar-btn" @click="$emit('toggle-apps')" title="Todas las apps">
        <span>📱</span>
      </button>
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
  computed: {
    allApps() {
      // Combinar apps abiertas con minimizadas
      const openAppIds = this.openApps.map(app => app.id);
      const minimizedAppsList = this.minimizedApps
        .map(id => this.availableApps.find(app => app.id === id))
        .filter(app => app && !openAppIds.includes(app.id));
      
      return [...this.openApps, ...minimizedAppsList];
    }
  },
  emits: ['focus-app', 'restore-app', 'toggle-apps'],
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
  margin-left: 12px;
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
}
</style>
