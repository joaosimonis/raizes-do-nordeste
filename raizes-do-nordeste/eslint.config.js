import vuetify from 'eslint-config-vuetify'

export default vuetify({
  ts: true,
  overrides: [
    {
      rules: {
        'antfu/top-level-function': 'off',
      },
    },
  ],
})
