<script setup lang="ts">
if (import.meta.server) {
  await navigateTo("/", { redirectCode: 301 })
} else {
  window.location.href = "/"
}
</script>
