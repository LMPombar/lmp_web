<template>
  <section class="skills">
    <div class="container">
      <h2 class="section-title">Mis Habilidades</h2>
      <div class="skills-grid">
        <div 
          v-for="skill in skills" 
          :key="skill.id"
          class="skill-card"
          @mouseenter="hoveredSkill = skill.id"
          @mouseleave="hoveredSkill = null"
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
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Estado reactivo
const hoveredSkill = ref(null)

// Datos
const skills = ref([
  {
    id: 1,
    name: 'Vue.js',
    icon: '💚',
    description: 'Framework progresivo para construir interfaces de usuario',
    level: 75
  },
  {
    id: 2,
    name: 'JavaScript',
    icon: '🟨',
    description: 'Lenguaje de programación para web dinámicas',
    level: 80
  },
  {
    id: 3,
    name: 'HTML5',
    icon: '🧡',
    description: 'Marcado semántico y estructura web moderna',
    level: 90
  },
  {
    id: 4,
    name: 'CSS3',
    icon: '💙',
    description: 'Estilos avanzados y diseño responsive',
    level: 85
  },
  {
    id: 5,
    name: 'Git',
    icon: '🔧',
    description: 'Control de versiones y colaboración',
    level: 70
  },
  {
    id: 6,
    name: 'Responsive Design',
    icon: '📱',
    description: 'Diseño adaptable a todos los dispositivos',
    level: 85
  }
])
</script>

<style scoped>
.skills {
  padding: 4rem 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
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
