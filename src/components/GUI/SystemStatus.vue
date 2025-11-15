<template>
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
            <div class="stat-item">
                <span class="stat-label">Caffeine</span>
                <div class="stat-bar">
                <div class="stat-progress" :style="{ width: systemStats.coffee + '%' }"></div>
                </div>
                <span class="stat-value">{{ systemStats.coffee }}%</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SystemStatus',
    data() {
        return {
            // System stats (dynamic)
            systemStats: {
                cpu: 85,
                memory: 92,
                creativity: 95,
                learning: 88,
                coffee: 30
            }
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

@media (max-width: 768px) {  
  .experience-counter {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  
  .experience-number {
    font-size: 18px;
  }
}
</style>