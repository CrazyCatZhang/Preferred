import { createPinia, Pinia } from 'pinia'
import pinaPluginPersistedState from 'pinia-plugin-persistedstate'

const pina: Pinia = createPinia()
pina.use(pinaPluginPersistedState)
export default pina
