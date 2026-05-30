<template>
  <div class="font-test">
    <h1 style="font-family: &quot;NotoSans-Regular&quot;, sans-serif">
      This is NotoSans-Regular test
    </h1>
    <h2 style="font-family: &quot;NotoSans-Medium&quot;, sans-serif">
      This is NotoSans-Medium test
    </h2>
    <p style="font-family: &quot;NotoSans&quot;, sans-serif">
      This is general NotoSans test with various weights:
    </p>
    <p style="font-family: &quot;NotoSans&quot;; font-weight: 300">Light weight text</p>
    <p style="font-family: &quot;NotoSans&quot;; font-weight: 400">Regular weight text</p>
    <p style="font-family: &quot;NotoSans&quot;; font-weight: 500">Medium weight text</p>
    <p style="font-family: &quot;NotoSans&quot;; font-weight: 600">SemiBold weight text</p>
    <p style="font-family: &quot;NotoSans&quot;; font-weight: 700">Bold weight text</p>

    <div class="font-family-test">
      <h3>Testing with CSS classes:</h3>
      <p class="noto-regular">This text should use NotoSans-Regular font</p>
      <p class="noto-medium">This text should use NotoSans-Medium font</p>
      <p class="noto-general">This text should use general NotoSans font</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Font test component
</script>

<style scoped>
.font-test {
  padding: 20px;
  font-size: 16px;
  line-height: 1.6;
}

.font-family-test {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ccc;
}

.noto-regular {
  font-family: "NotoSans-Regular", sans-serif;
}

.noto-medium {
  font-family: "NotoSans-Medium", sans-serif;
}

.noto-general {
  font-family: "NotoSans", sans-serif;
}
</style>
