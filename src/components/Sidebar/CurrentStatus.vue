<template>
    <div class="status-widget current-status-widget">
        <h3 class="widget-title">🔄 Estado Actual</h3>
        <div class="status-items">
        <div class="status-item">
            <span class="status-indicator available"></span>
            <span class="status-text">Disponible para proyectos</span>
        </div>
        <div class="status-item">
            <span class="status-indicator learning"></span>
            <span class="status-text">Aprendiendo Vue.js y Angular</span>
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
</template>

<script>
export default {
    name: 'CurrentStatus',
    data() {
        return {
            // System stats (dynamic)
            systemStats: {
                cpu: 85,
                memory: 92,
                creativity: 95,
                learning: 88,
                coffee: 30
            },
            lastActivity: 'Desarrollando terminal portfolio'
        }
    },
    mounted() {
        this.startSystemStatsAnimation()
    },
    methods: {
        startSystemStatsAnimation() {
            setInterval(() => {  // Simulate dynamic system stats
                this.systemStats.cpu = Math.max(70, Math.min(95, this.systemStats.cpu + (Math.random() - 0.5) * 10))
                this.systemStats.memory = Math.max(85, Math.min(98, this.systemStats.memory + (Math.random() - 0.5) * 5))
                this.systemStats.creativity = Math.max(90, Math.min(99, this.systemStats.creativity + (Math.random() - 0.5) * 3))
                this.systemStats.learning = Math.max(80, Math.min(95, this.systemStats.learning + (Math.random() - 0.5) * 8))
                this.systemStats.coffee = Math.max(100, Math.min(0, this.systemStats.coffee + (Math.random() - 0.5) * 8))
            }, 5000) // Update every 5 seconds
        }
    } 
}
</script>

<style scoped>
.status-widget {
  background: var(--widget-background);
  border: var(--widget-border);
  border-radius: var(--widget-border-radius);
  padding: var(--widget-padding);
  margin-bottom: var(--widget-margin);
  box-shadow: var(--widget-shadow);
}

.widget-title {
  color: var(--title-color);
  font-size: var(--title-size);
  margin-bottom: var(--title-margin);
  padding-bottom: 8px;
  border-bottom: var(--title-border);
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

</style>