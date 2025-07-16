// styles.config.ts
export const styles = {
  card: {
    base:        'flex flex-col p-4 rounded-lg shadow-lg border transition-colors',
    visible:     'bg-vigo-blue text-white border-vigo-gray',
    hidden:      'bg-vigo-gray text-gray-700 border-vigo-gray opacity-70',
    doneButton: {
      done:     'bg-vigo-orange hover:bg-vigo-red text-white',
      todo:     'bg-blue-600 hover:bg-vigo-purple text-white'
    }
  },
  overview: {
    container:   'min-h-screen bg-gray-100 dark:bg-gray-900 p-6',
    header:      'max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-6',
    title:       'text-3xl font-bold text-vigo-orange',
    subtitle:    'text-sm text-vigo-gray mt-1',
    stats:       'flex items-baseline space-x-4 mt-4 sm:mt-0',
    statsCount:  'text-2xl font-semibold text-vigo-orange',
    statsLabel:  'text-gray-500'
  },
  grid:         'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6',
  quickActions: 'bg-gray-800 p-4 rounded-lg flex flex-wrap gap-3',
  quickButton: 'flex-1 px-4 py-2 rounded transition',
  quickButtonVariants: {
    resetAll: 'vigo-orange hover:vigo-orange text-white',
    markAll: 'vigo-red hover:vigo-red text-white',
    showAll: 'bg-blue-600 hover:bg-blue-700 text-white',
    hideAll: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    locale: 'bg-gray-800 text-white hover:bg-gray-700'
  }
};
