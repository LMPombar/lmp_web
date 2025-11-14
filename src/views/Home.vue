<template>
  <div class="home">
    <HeroSection />
    <SkillsSection />
    <ContactPreview />
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ContactPreview from '../components/ContactPreview.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    SkillsSection,
    ContactPreview
  }
}
</script>

<style scoped>
.home {
  margin-top: 70px; /* Para compensar el header fijo */
}
</style>
