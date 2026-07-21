import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        admission: resolve(__dirname, 'admission.html'),
        alumni: resolve(__dirname, 'alumni.html'),
        campusLife: resolve(__dirname, 'campus-life.html'),
        chirantan: resolve(__dirname, 'chirantan.html'),
        faculty: resolve(__dirname, 'faculty.html'),
        journalOfBusinessGovernance: resolve(__dirname, 'journal-of-business-governance.html'),
        lifeMembership: resolve(__dirname, 'life-membership.html'),
        mdp: resolve(__dirname, 'mdp.html'),
        mou: resolve(__dirname, 'mou.html'),
        nodalResearch: resolve(__dirname, 'nodal-research.html'),
        placement: resolve(__dirname, 'placement.html'),
        programs: resolve(__dirname, 'programs.html'),
        teachingInnovation: resolve(__dirname, 'teaching-innovation.html')
      }
    }
  }
});
