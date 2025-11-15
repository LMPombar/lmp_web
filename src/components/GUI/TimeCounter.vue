<template>
    <div class="status-widget experience-widget">
        <h3 class="widget-title">👩‍💻 Experiencia profesional</h3>
        <div class="experience-counter">
        <div class="experience-item">
            <span class="experience-number">{{ experienceTime.years }}</span>
            <span class="experience-label">años</span>
        </div>
        <div class="experience-item">
            <span class="experience-number">{{ experienceTime.months }}</span>
            <span class="experience-label">meses</span>
        </div>
        <div class="experience-item">
            <span class="experience-number">{{ experienceTime.days }}</span>
            <span class="experience-label">días</span>
        </div>
        <div class="experience-item">
            <span class="experience-number">{{ experienceTime.hours }}</span>
            <span class="experience-label">horas</span>
        </div>
        <div class="experience-item">
            <span class="experience-number">{{ experienceTime.minutes }}</span>
            <span class="experience-label">minutos</span>
        </div>
        <div class="experience-item">
            <span class="experience-number">{{ experienceTime.seconds }}</span>
            <span class="experience-label">segundos</span>
        </div>
        </div>
        <div class="experience-start">
        Trabajando desde: {{ experienceStartDate.toLocaleDateString('es-ES', { 
            year: 'numeric', month: 'long', day: 'numeric' 
        }) }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'TimeCounter',
    data() {
        return {
            experienceStartDate: new Date('2016-03-15T08:00:00'),
            experienceTime: {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0, 
                seconds: 0,
            },
            experienceTimer: null,
        }
    },
    mounted() {
        this.calculateExperienceTime();
        this.experienceTimer = setInterval(this.calculateExperienceTime, 1000); // Actualiza cada segundo
    },
    beforeUnmount() {
        if (this.experienceTimer) {
            clearInterval(this.experienceTimer);
        }
    },
    methods: {
        calculateExperienceTime() {
            const now = new Date();
            let delta = Math.floor((now - this.experienceStartDate) / 1000); // Diferencia en segundos

            this.experienceTime.years = Math.floor(delta / (365 * 24 * 60 * 60));
            delta -= this.experienceTime.years * 365 * 24 * 60 * 60;

            this.experienceTime.months = Math.floor(delta / (30 * 24 * 60 * 60));
            delta -= this.experienceTime.months * 30 * 24 * 60 * 60;

            this.experienceTime.days = Math.floor(delta / (24 * 60 * 60));
            delta -= this.experienceTime.days * 24 * 60 * 60;

            this.experienceTime.hours = Math.floor(delta / (60 * 60));
            delta -= this.experienceTime.hours * 60 * 60;

            this.experienceTime.minutes = Math.floor(delta / 60);
            delta -= this.experienceTime.minutes * 60;

            this.experienceTime.seconds = delta;
        }
    },
    
    // Experience counter methods
    startExperienceTimer() {
      this.updateExperienceTime();
      this.experienceTimer = setInterval(() => {
        this.updateExperienceTime();
      }, 1000); // Update every second
    },
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

/* Experience Widget */
.experience-counter {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 15px !important;
}

.experience-item {
  text-align: center;
  background: rgba(0, 255, 136, 0.05);
  padding: 10px;
  border-radius: 6px;
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.experience-number {
  display: block;
  color: var(--primary-color);
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.experience-label {
  color: var(--text-muted);
  font-size: 12px;
  text-transform: uppercase;
}

.experience-start {
  color: var(--text-muted);
  font-size: 12px;
  text-align: center;
  font-style: italic;
}

</style>