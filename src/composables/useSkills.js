// composables/useSkills.js
import { ref, computed } from 'vue'

export function useSkills() {
  const hoveredSkill = ref(null)
  const skills = ref([
    {
      id: 1,
      name: 'Vue.js',
      icon: '💚',
      description: 'Framework progresivo para construir interfaces de usuario',
      level: 75,
      category: 'frontend'
    },
    {
      id: 2,
      name: 'JavaScript',
      icon: '🟨',
      description: 'Lenguaje de programación para web dinámicas',
      level: 80,
      category: 'programming'
    },
    {
      id: 3,
      name: 'HTML5',
      icon: '🧡',
      description: 'Marcado semántico y estructura web moderna',
      level: 90,
      category: 'frontend'
    },
    {
      id: 4,
      name: 'CSS3',
      icon: '💙',
      description: 'Estilos avanzados y diseño responsive',
      level: 85,
      category: 'frontend'
    }
  ])

  // Computed para filtrar skills
  const frontendSkills = computed(() => 
    skills.value.filter(skill => skill.category === 'frontend')
  )

  const averageSkillLevel = computed(() => {
    const total = skills.value.reduce((sum, skill) => sum + skill.level, 0)
    return Math.round(total / skills.value.length)
  })

  // Métodos
  const setHoveredSkill = (skillId) => {
    hoveredSkill.value = skillId
  }

  const clearHoveredSkill = () => {
    hoveredSkill.value = null
  }

  const addSkill = (newSkill) => {
    const newId = Math.max(...skills.value.map(s => s.id)) + 1
    skills.value.push({ ...newSkill, id: newId })
  }

  return {
    // Estado
    hoveredSkill,
    skills,
    
    // Computed
    frontendSkills,
    averageSkillLevel,
    
    // Métodos
    setHoveredSkill,
    clearHoveredSkill,
    addSkill
  }
}
