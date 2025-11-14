<template>
  <section class="skills">
    <div class="container">
      <h2 class="section-title">Mis Habilidades</h2>
      <p class="average-level">Nivel promedio: {{ averageSkillLevel }}%</p>
      
      <div class="skills-grid">
        <div 
          v-for="skill in skills" 
          :key="skill.id"
          class="skill-card"
          @mouseenter="setHoveredSkill(skill.id)"
          @mouseleave="clearHoveredSkill"
        >
          <div class="skill-icon">{{ skill.icon }}</div>
          <h3 class="skill-name">{{ skill.name }}</h3>
          <p class="skill-description">{{ skill.description }}</p>
          <div class="skill-progress">
            <div 
              class="progress-bar" 
              :style="{ width: hoveredSkill === skill.id ? skill.level + '%' : '0%' }"
            ></div>
          </div>
          <span class="skill-level">{{ skill.level }}%</span>
        </div>
      </div>

      <div class="frontend-summary">
        <h3>Skills Frontend: {{ frontendSkills.length }}</h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSkills } from '@/composables/useSkills.js'

// Usando el composable
const {
  hoveredSkill,
  skills,
  frontendSkills,
  averageSkillLevel,
  setHoveredSkill,
  clearHoveredSkill
} = useSkills()
</script>

<style scoped>
/* ...mismos estilos que antes... */
.skills {
  padding: 4rem 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.average-level {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  color: #666;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.skill-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.skill-name {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.skill-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.skill-progress {
  background: #e9ecef;
  border-radius: 10px;
  height: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.progress-bar {
  background: linear-gradient(90deg, #007bff, #0056b3);
  height: 100%;
  border-radius: 10px;
  transition: width 1s ease;
}

.skill-level {
  font-weight: bold;
  color: #007bff;
}

.frontend-summary {
  text-align: center;
  padding: 1rem;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 10px;
  color: #007bff;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }

  .skill-card {
    padding: 1.5rem;
  }
}
</style>
