<template>
    <div class="status-column">
        <TimeCounter />
        <TechStack />
        <SystemStatus />
        <CurrentStatus />
    </div>
</template>

<script>
import TimeCounter from './TimeCounter.vue'
import TechStack from './TechStack.vue'
import SystemStatus from './SystemStatus.vue'
import CurrentStatus from './CurrentStatus.vue'

export default {
    name: 'TerminalSidebar',
    components: {
        TimeCounter,
        TechStack,
        SystemStatus,
        CurrentStatus
    },
    data() {
        return {}
    }
}
</script>

<style scoped>
.status-column {
  width: 400px;
  background: #111;
  border-left: 2px solid #333;
  padding: 20px;
  overflow-y: auto;
  flex-shrink: 0;
}


/* Responsive */
@media (max-width: 1200px) {  
  .status-column {
    width: 100%;
    order: -1;
    max-height: 50vh;
  }
}

@media (max-width: 768px) {
  .status-column {
    padding: 10px;
  }
}

/* Scrollbar personalizada */
.status-column::-webkit-scrollbar {
  width: 8px;
}

.status-column::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.status-column::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}

.status-column::-webkit-scrollbar-thumb:hover {
  background: #666;
}
</style>