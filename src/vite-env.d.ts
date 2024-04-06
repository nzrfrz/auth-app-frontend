/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly DEV_BASE_PATH: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
