import { defineConfig } from 'orval';

export default defineConfig({
  visualInspection: {
    output: {
      mode: 'split',
      target: 'src/apis/endpoints/api.ts',
      schemas: 'src/apis/model',
      client: 'react-query',
      override: {
        mutator: {
          path: 'src/apis/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: 'http://95.111.231.114:88/swagger/v1/swagger.json',
    },
  },
});
