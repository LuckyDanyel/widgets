<template lang="">
    <div>
        <h1>{{ hello }}</h1>
    </div>
</template>
<script setup>
    import { inject } from 'vue';
    const hello = inject('text');
</script>
<style lang="">
</style>