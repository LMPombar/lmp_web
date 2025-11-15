<template>
  <div class="taskbar">
    <div class="taskbar-apps">
      <button
        v-for="app in openApps"
        :key="app.id"
        :class="['taskbar-app', { active: app.id === activeAppId }]"
        @click="$emit('focus-app', app.id)"
      >
        <span class="app-icon">{{ app.icon }}</span>
        <span class="app-name">{{ app.name }}</span>
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
    }
  },
  emits: ['focus-app', 'toggle-apps']
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
