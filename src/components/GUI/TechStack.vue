<template>
    <div class="status-widget tech-widget">
          <h3 class="widget-title">🛠️ Tech Stack</h3>
          <div class="tech-categories">
            <div v-for="(category, categoryName) in techStack" :key="categoryName" class="tech-category">
              <h4 class="category-title">{{ category.title }}</h4>
              <div class="tech-items">
                <div 
                  v-for="tech in category.items" 
                  :key="tech.name"
                  class="tech-item"
                  :style="{ '--skill-level': tech.level + '%' }"
                >
                  <span class="tech-icon">{{ tech.icon }}</span>
                  <span class="tech-name">{{ tech.name }}</span>
                  <div class="tech-bar">
                    <div class="tech-progress"></div>
                  </div>
                  <span class="tech-level">{{ tech.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  name: 'TechStack',
  data() {
    return {
      techStack: {
        backend: {
          title: 'Backend',
          items: [
            { name: 'Python', icon: '🐍', level: 99 },
            { name: 'Django', icon: '🌐', level: 80 },
            { name: 'FastAPI', icon: '⚡', level: 75 },
            { name: 'PostgreSQL', icon: '🐘', level: 80 },
            { name: 'Redis', icon: '🔴', level: 75 }
          ]
        },
        devops: {
          title: 'DevOps',
          items: [
            { name: 'Docker', icon: '🐳', level: 60 },
            { name: 'Github Actions', icon: '⚙️', level: 65 },
            { name: 'CI/CD', icon: '🔄', level: 65 },
            { name: 'AWS', icon: '☁️', level: 60 }
          ]
        },
        ai: {
          title: 'IA & Data',
          items: [
            { name: 'Machine Learning', icon: '🤖', level: 50 },
            { name: 'Data Analysis', icon: '📊', level: 50 },
            { name: 'LLMs', icon: '🧩', level: 55 },
            { name: 'BigQuery', icon: '🗣️', level: 60 }
          ]
        },
        frontend: {
          title: 'Frontend',
          items: [
            { name: 'Vue.js', icon: '💚', level: 30 },
            { name: 'JavaScript', icon: '🟨', level: 70 },
            { name: 'Angular', icon: '💙', level: 50 },
            { name: 'Alpine.js', icon: '🧡', level: 60 }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
/* Widget base styles - usando CSS Variables del padre */
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

.tech-categories {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tech-category {
  background: rgba(0, 123, 255, 0.05);
  border: 1px solid var(--secondary-color, #007bff);
  border-radius: 6px;
  padding: 12px;
}

.category-title {
  color: var(--secondary-color);
  font-size: 14px;
  margin-bottom: 10px;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.tech-name {
  color: var(--text-color);
  font-size: 12px;
  min-width: 80px;
}

.tech-bar {
  flex: 1;
  height: 4px;
  background: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
}

.tech-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
  width: var(--skill-level);
  border-radius: 2px;
  transition: width 2s ease;
}

.tech-level {
  color: var(--text-muted);
  font-size: 10px;
  min-width: 35px;
  text-align: right;
}
</style>