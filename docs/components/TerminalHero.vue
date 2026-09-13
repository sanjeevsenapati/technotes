<template>
  <div class="terminal-container">
    <div class="terminal-header">
      <div class="window-buttons">
        <span class="btn close"></span>
        <span class="btn minimize"></span>
        <span class="btn maximize"></span>
      </div>
      <div class="window-title">root@technotes:~</div>
    </div>
    <div class="terminal-body">
      <div class="command-line" v-for="(line, index) in history" :key="index">
        <span class="prompt">root@technotes:~$</span> <span class="command">{{ line.command }}</span>
        <div class="output" v-if="line.output" v-html="line.output"></div>
      </div>
      
      <div class="command-line current">
        <span class="prompt">root@technotes:~$</span> <span class="typing">{{ currentTyping }}</span><span class="cursor"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const commands = [
  {
    cmd: 'kubectl get pods -n ingress-nginx',
    out: 'NAME                                        READY   STATUS    RESTARTS   AGE<br>ingress-nginx-controller-6b84c89f55-x9z2p   1/1     <span style="color:#4ade80">Running</span>   0          12d<br>ingress-nginx-controller-6b84c89f55-yr79w   1/1     <span style="color:#4ade80">Running</span>   0          12d'
  },
  {
    cmd: 'openssl s_client -connect api.example.com:443 -servername api.example.com',
    out: 'CONNECTED(00000003)<br>depth=0 CN = api.example.com<br>verify return:1<br>---<br>Certificate chain<br> 0 s:CN = api.example.com<br>   i:C = US, O = Let\'s Encrypt, CN = R3'
  },
  {
    cmd: 'docker compose -f prod.yml up -d',
    out: '<span style="color:#60a5fa">[+] Running 3/3</span><br> ✔ Network prod_backend     <span style="color:#4ade80">Created</span><br> ✔ Container prod-db-1      <span style="color:#4ade80">Started</span><br> ✔ Container prod-api-1     <span style="color:#4ade80">Started</span>'
  }
]

const history = ref([])
const currentTyping = ref('')
let cmdIndex = 0
let charIndex = 0
let timeoutId = null

const typeCommand = () => {
  if (cmdIndex >= commands.length) {
    // Loop back
    timeoutId = setTimeout(() => {
      history.value = []
      cmdIndex = 0
      typeCommand()
    }, 4000)
    return
  }

  const currentCmd = commands[cmdIndex].cmd
  
  if (charIndex < currentCmd.length) {
    if (charIndex === 0) history.value = []
    currentTyping.value += currentCmd.charAt(charIndex)
    charIndex++
    // Randomize typing speed slightly for realism
    timeoutId = setTimeout(typeCommand, 30 + Math.random() * 50)
  } else {
    // Finished typing command, show output after brief pause
    timeoutId = setTimeout(() => {
      history.value.push({
        command: currentCmd,
        output: commands[cmdIndex].out
      })
      currentTyping.value = ''
      charIndex = 0
      cmdIndex++
      // Wait before typing next command
      timeoutId = setTimeout(typeCommand, 2000)
    }, 400)
  }
}

onMounted(() => {
  // Start slightly after mount
  timeoutId = setTimeout(typeCommand, 1000)
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<style scoped>
.terminal-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  background-color: #0f111a;
  border: 1px solid rgba(255,255,255,0.1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  line-height: 1.5;
  color: #e2e8f0;
}

.terminal-header {
  background-color: #1e1e2e;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.window-buttons {
  display: flex;
  gap: 8px;
}

.btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.btn.close { background-color: #ff5f56; }
.btn.minimize { background-color: #ffbd2e; }
.btn.maximize { background-color: #27c93f; }

.window-title {
  margin-left: 20px;
  color: #94a3b8;
  font-size: 0.8rem;
}

.terminal-body {
  padding: 1.5rem;
  height: 220px;
  overflow: hidden;
}

.prompt {
  color: #38bdf8;
  margin-right: 0.5rem;
}

.command {
  color: #f8fafc;
}

.typing {
  color: #f8fafc;
}

.output {
  color: #cbd5e1;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  background-color: #38bdf8;
  vertical-align: middle;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
