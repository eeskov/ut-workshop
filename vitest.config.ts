import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text'],
            thresholds:{
                lines: 77,
                statements: 77,
                functions: 77,
                branches: 77
            }
        },
    },
})