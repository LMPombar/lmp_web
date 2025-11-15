<template>
  <div class="os-bar">
    <div class="os-brand">
      <span class="os-icon">🖥️</span>
      <span class="os-name">Laura OS</span>
    </div>
    
    <div class="os-info">
      <span class="os-time">{{ currentTime }}</span>
      <span class="os-status">{{ systemStatus }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OSBar',
  data() {
    return {
      currentTime: '',
      systemStatus: '✓ Online'
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  }
};
</script>

<style scoped>
.os-bar {
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  border-bottom: 2px solid var(--primary-color);
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(0, 255, 136, 0.2);
}

.os-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.os-icon {
  font-size: 20px;
}

.os-name {
  color: var(--primary-color);
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
}

.os-info {
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--text-color);
  font-size: 13px;
}

.os-time {
  font-family: 'Courier New', monospace;
  color: var(--accent-color);
}

.os-status {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .os-bar {
    padding: 6px 12px;
    height: 36px;
  }
  
  .os-name {
    font-size: 14px;
  }
  
  .os-info {
    gap: 10px;
    font-size: 11px;
  }
}
</style>
