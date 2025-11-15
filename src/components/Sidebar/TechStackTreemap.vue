<template>
  <div class="status-widget tech-widget">
    <h3 class="widget-title">🛠️ Tech Stack</h3>
    <div class="treemap-container">
      <svg ref="treemap" class="treemap-svg"></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'TechStackTreemap',
  data() {
    return {
      simulation: null,
      techData: {
        name: 'Tech Stack',
        children: [
          {
            name: 'Backend',
            color: '#00ff88',
            children: [
              { name: 'Python', value: 90, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { name: 'Django', value: 60, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
              { name: 'PostgreSQL', value: 80, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { name: 'FastAPI', value: 40, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
              { name: 'SQLAlchemy', value: 40, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg' },
              { name: 'Kotlin', value: 20, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' }
            ]
          },
          {
            name: 'DevOps',
            color: '#007bff',
            children: [
              { name: 'Docker', value: 60, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
              { name: 'AWS', value: 70, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
              { name: 'GCloud', value: 40, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
              { name: 'Azure', value: 20, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
              { name: 'Github Actions', value: 65, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' }
            ]
          },
          {
            name: 'IA & Data',
            color: '#ff6b6b',
            children: [
              { name: 'Tensorflow', value: 20, logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tensorflow.svg' },
              { name: 'Pandas', value: 50, logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pandas.svg' },
              { name: 'Scikitlearn', value: 30, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
            ]
          },
          {
            name: 'Frontend',
            color: '#ffbd2e',
            children: [
              { name: 'JavaScript', value: 50, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
              { name: 'Alpine.js', value: 45, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/alpinejs/alpinejs-original.svg' },
              { name: 'Angular', value: 30, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
              { name: 'Vue.js', value: 20, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.createForceLayout();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    if (this.simulation) {
      this.simulation.stop();
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.createForceLayout();
    },
    
    createForceLayout() {
      // Detener simulación anterior
      if (this.simulation) {
        this.simulation.stop();
      }
      
      // Limpiar SVG anterior
      d3.select(this.$refs.treemap).selectAll('*').remove();
      
      const container = this.$refs.treemap.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Crear el SVG
      const svg = d3.select(this.$refs.treemap)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('font-family', '"Fira Code", monospace');
      
      // Preparar datos planos
      const nodes = [];
      this.techData.children.forEach(category => {
        category.children.forEach(tech => {
          nodes.push({
            ...tech,
            category: category.name,
            color: category.color,
            size: Math.sqrt(tech.value) * 6 // Tamaño más ajustado
          });
        });
      });
      
      // Crear simulación de fuerzas
      this.simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(5)) // Atracción/repulsión leve
        .force('center', d3.forceCenter(centerX, centerY)) // Centrar
        .force('collision', d3.forceCollide().radius(d => d.size + 5)) // Evitar colisiones
        .force('radial', d3.forceRadial(d => {
          // Los más grandes más cerca del centro
          return (100 - d.value) * 2;
        }, centerX, centerY).strength(0.5));
      
      // Crear grupos para cada nodo
      const nodeGroups = svg.selectAll('.node')
        .data(nodes)
        .join('g')
        .attr('class', 'node')
        .style('cursor', 'pointer');
      
      // Círculos
      nodeGroups.append('circle')
        .attr('r', d => d.size)
        .attr('cx', d => d.size)
        .attr('cy', d => d.size)
        .attr('fill', d => d3.color(d.color).darker(0.5))
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .on('mouseover', function(event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('stroke-width', 4)
            .attr('opacity', 0.8);
          
          tooltip
            .style('visibility', 'visible')
            .html(`
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: ${d.color};">▸</span>
                <span>${d.name}</span>
                <span style="color: ${d.color};">${d.value}%</span>
              </div>
            `)
            .style('left', (event.pageX + 15) + 'px')
            .style('top', (event.pageY - 30) + 'px');
        })
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('stroke-width', 2)
            .attr('opacity', 1);
          
          tooltip.style('visibility', 'hidden');
        });
      
      // Logos (más grandes, ocupan más espacio en el círculo)
      nodeGroups.append('image')
        .attr('xlink:href', d => d.logo)
        .attr('width', d => Math.min(d.size * 1.4, 40))
        .attr('height', d => Math.min(d.size * 1.4, 40))
        .style('pointer-events', 'none')
        .style('opacity', 0.9);
      
      // Nombre (justo debajo del logo)
      nodeGroups.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .attr('font-size', d => Math.min(d.size / 3, 9) + 'px')
        .attr('font-weight', 'bold')
        .style('pointer-events', 'none')
        .text(d => d.size > 30 ? d.name : '')
        .each(function(d) {
          if (d.size < 30 && d.name.length > 8) {
            d3.select(this).text(d.name.substring(0, 6) + '...');
          }
        });
      
      // Tooltip
      const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'treemap-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'rgba(0, 0, 0, 0.9)')
        .style('color', '#fff')
        .style('padding', '8px 12px')
        .style('border-radius', '6px')
        .style('border', '2px solid #00ff88')
        .style('font-size', '13px')
        .style('font-weight', 'bold')
        .style('z-index', '1000')
        .style('pointer-events', 'none')
        .style('font-family', '"Fira Code", monospace')
        .style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.3)');
      
      // Actualizar posiciones en cada tick
      this.simulation.on('tick', () => {
        nodeGroups.attr('transform', d => {
          // Mantener dentro de los límites
          d.x = Math.max(d.size, Math.min(width - d.size, d.x));
          d.y = Math.max(d.size, Math.min(height - d.size, d.y));
          return `translate(${d.x - d.size},${d.y - d.size})`;
        });
        
        // Actualizar posición del logo (centrado en el círculo)
        const logoSize = d => Math.min(d.size * 1.4, 40);
        nodeGroups.select('image')
          .attr('x', d => d.size - logoSize(d) / 2)
          .attr('y', d => d.size - logoSize(d) / 2);
        
        // Actualizar posición del texto (justo debajo del logo)
        nodeGroups.select('text')
          .attr('x', d => d.size)
          .attr('y', d => d.size + logoSize(d) / 2 + 12);
      });
    }
  }
};
</script>

<style scoped>
/* Widget base styles */
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

.treemap-container {
  width: 100%;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  background: #1a1a1a;
}

.treemap-svg {
  width: 100%;
  height: 100%;
}

/* Animación de entrada */
.node {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .treemap-container {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .treemap-container {
    height: 400px;
  }
}
</style>