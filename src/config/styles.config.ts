// styles.config.ts
export const styles = {
  card: {
    base: 'flex flex-col p-4 rounded-lg shadow-lg transition-colors border',
    visible: 'bg-gray-700 dark:bg-gray-600 border-gray-500 text-white',
    hidden: 'bg-gray-900 dark:bg-gray-800 border-gray-300 text-gray-400 opacity-70',
    doneButton: {
      done: 'bg-green-600 hover:bg-green-700 text-white',
      todo: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  },
  overview: {
    container: 'min-h-screen bg-gray-900 text-gray-100 p-6',
    header: 'max-w-2xl mx-auto flex justify-between items-center mb-6',
    title: 'text-2xl font-semibold',
    stats: 'text-right',
    statsCount: 'text-xl font-bold',
    statsLabel: 'text-gray-400'
  },
  grid: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6',
  quickActions: 'bg-gray-800 p-4 rounded-lg flex flex-wrap gap-3'
};
