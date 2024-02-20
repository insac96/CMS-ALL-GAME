export default defineAppConfig({
  ui: {
    primary: 'emerald',
    
    gray: 'cool',

    icons: {
      dynamic: true
    },

    button: {
      default: {
        loadingIcon: 'i-bx-loader-alt'
      }
    },

    card: {
      base: 'relative overflow-x-hidden overflow-visible'
    },

    input: {
      default: {
        size: 'lg',
        loadingIcon: 'i-bx-loader-alt'
      }
    },

    alert:{
      variant: {
        soft: 'bg-{color}-500 bg-opacity-10'
      }
    },

    badge: {
      variant: {
        soft: 'bg-{color}-500 bg-opacity-10'
      }
    },

    modal: {
      container: 'items-center',
      overlay: {
        background: 'bg-white/25 dark:bg-black/50 backdrop-blur'
      },
      base: 'overflow-x-hidden overflow-visible'
    },

    slideover: {
      overlay: {
        background: 'bg-white/25 dark:bg-black/50 backdrop-blur'
      }
    },

    notifications: {
      position: 'right-0 top-0 bottom-auto',
    },
    
    notification: {
      background: 'dark:bg-black/50 backdrop-blur',
      progress: {
        base: 'h-0.5'
      }
    },

    formGroup: {
      wrapper: 'mb-4',
      container: 'mt-2'
    },

    table: {
      th: {
        base: 'whitespace-nowrap'
      }
    },

    pagination: {
      wrapper: 'flex items-center gap-1',
      rounded: '!rounded-full min-w-[32px] justify-center'
    },

    select: {
      default: {
        loadingIcon: 'i-bx-loader-alt'
      }
    }
  }
})