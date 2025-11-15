<template>
  <div 
    :class="['os-window', { maximized: isMaximized, minimized: isMinimized, dragging: isDragging }]"
    :style="windowStyles"
    @mousedown="bringToFront"
  >
    <!-- Window Header -->
    <div 
      class="window-header"
      @mousedown="startDrag"
    >
      <div class="window-title">
        <span class="window-icon">{{ icon }}</span>
        <span class="window-name">{{ title }}</span>
      </div>
      
      <div class="window-controls">
        <button 
          v-if="canMinimize"
          @click="$emit('minimize')" 
          class="window-btn minimize-btn"
          title="Minimizar"
        >
          −
        </button>
        <button 
          v-if="canMaximize"
          @click="toggleMaximize" 
          class="window-btn maximize-btn"
          :title="isMaximized ? 'Restaurar' : 'Maximizar'"
        >
          {{ isMaximized ? '◱' : '□' }}
        </button>
        <button 
          v-if="canClose"
          @click="$emit('close')" 
          class="window-btn close-btn"
          title="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
    
    <!-- Window Content -->
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OSWindow',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: '📄'
    },
    canClose: {
      type: Boolean,
      default: true
    },
    canMinimize: {
      type: Boolean,
      default: true
    },
    canMaximize: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    initialX: {
      type: Number,
      default: 0
    },
    initialY: {
      type: Number,
      default: 0
    },
    canDrag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isMaximized: false,
      isMinimized: false,
      isDragging: false,
      currentX: this.initialX,
      currentY: this.initialY,
      initialMouseX: 0,
      initialMouseY: 0
    };
  },
  computed: {
    windowStyles() {
      if (this.isMaximized) {
        return {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '0'
        };
      }
      return {
        width: this.width,
        height: this.height,
        position: 'absolute',
        left: `${this.currentX}px`,
        top: `${this.currentY}px`
      };
    }
  },
  emits: ['close', 'minimize', 'maximize', 'focus'],
  methods: {
    toggleMaximize() {
      this.isMaximized = !this.isMaximized;
      this.$emit('maximize', this.isMaximized);
    },
    
    startDrag(e) {
      if (!this.canDrag || this.isMaximized || e.target.closest('.window-btn')) {
        return; // No arrastrar si está maximizada o si se clickeó un botón
      }
      
      this.isDragging = true;
      this.initialMouseX = e.clientX - this.currentX;
      this.initialMouseY = e.clientY - this.currentY;
      
      document.addEventListener('mousemove', this.drag);
      document.addEventListener('mouseup', this.stopDrag);
      
      e.preventDefault();
    },
    
    drag(e) {
      if (!this.isDragging) return;
      
      this.currentX = e.clientX - this.initialMouseX;
      this.currentY = e.clientY - this.initialMouseY;
      
      e.preventDefault();
    },
    
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.drag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    
    bringToFront() {
      this.$emit('focus');
    }
  },
  
  beforeUnmount() {
    // Limpiar event listeners si el componente se destruye durante el drag
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.stopDrag);
  }
};
</script>

<style scoped>
.os-window {
  background: #1e1e1e;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  height: auto;
}

.os-window.dragging {
  box-shadow: 0 12px 48px rgba(0, 255, 136, 0.3);
  transition: none;
}

.os-window.maximized {
  border-radius: 0;
  height: 100%;
}

.os-window.minimized {
  display: none;
}

.window-header {
  background: #2d2d2d;
  border-bottom: 1px solid var(--border-color);
  padding: 2px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  user-select: none;
  cursor: move;
}

.window-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.window-icon {
  font-size: 16px;
}

.window-name {
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
}

.window-controls {
  display: flex;
  gap: 6px;
}

.window-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;
  font-family: Arial, sans-serif;
  line-height: 1;
}

.window-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.minimize-btn:hover {
  background: rgba(255, 189, 46, 0.2);
  color: #ffbd2e;
}

.maximize-btn:hover {
  background: rgba(40, 202, 66, 0.2);
  color: #28ca42;
}

.close-btn:hover {
  background: rgba(255, 95, 87, 0.2);
  color: #ff5f57;
}

.window-content {
  flex: 0 1 auto;
  overflow: auto;
  background: #0a0a0a;
  max-height: calc(100vh - 150px);
}

@media (max-width: 768px) {
  .window-header {
    padding: 6px 10px;
  }
  
  .window-name {
    font-size: 13px;
  }
  
  .window-btn {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }
}
</style>
