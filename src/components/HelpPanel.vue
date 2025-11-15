<template>
  <div v-if="showHelp" class="help-panel">
    <h3>📖 Comandos Disponibles:</h3>
    <div class="help-commands">
      <div v-for="cmd in availableCommands" :key="cmd.name" class="help-item">
        <code>{{ cmd.name }}</code> - {{ cmd.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpPanel',
  props: {
    availableCommands: {
      type: Array,
      required: true
    },
    showHelp: {
      type: Boolean,
      required: false, 
      default: true
    }
  },
  methods: {
    getHelp() {
      let helpContent = '';
      for (const cmd of this.availableCommands) {
        helpContent += `<code>${cmd.name}</code> - ${cmd.description}\n`;
      }
      return helpContent;
    }
  }
}
</script>

<style scoped>
.help-panel {
  background: rgba(0, 123, 255, 0.05);
  border: 1px solid rgba(0, 123, 255, 0.2);
  border-radius: 6px;
  padding: 15px;
  margin: 20px 0;
}

.help-panel h3 {
  color: #007bff;
  margin-bottom: 10px;
  font-size: 16px;
}

.help-commands {
  display: grid;
  gap: 8px;
}

.help-item {
  color: #ccc;
  font-size: 13px;
}

.help-item code {
  color: #ffbd2e;
  background: rgba(255, 189, 46, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: inherit;
}
</style>
