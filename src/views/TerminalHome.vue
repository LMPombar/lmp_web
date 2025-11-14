<template>
  <TerminalPortfolio @navigate-to="handleNavigation" />
</template>

<script>
import TerminalPortfolio from '../components/TerminalPortfolio.vue'

export default {
  name: 'TerminalHome',
  components: {
    TerminalPortfolio
  },
  methods: {
    handleNavigation(section) {
      // Navegación interna del terminal o cambio de vista
      switch (section) {
        case 'contact':
          this.$router.push('/contact')
          break
        case 'projects':
          this.$router.push('/projects')
          break
        case 'about':
          this.$router.push('/about')
          break
      }
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para la vista terminal si es necesario */
</style>
